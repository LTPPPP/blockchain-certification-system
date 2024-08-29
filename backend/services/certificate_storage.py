import json
import hashlib
from Crypto.Cipher import AES
from Crypto.Random import get_random_bytes
from web3 import Web3

# Kết nối đến mạng Ethereum (ví dụ: Ganache cho môi trường phát triển)
w3 = Web3(Web3.HTTPProvider('http://localhost:8545'))

# Địa chỉ của smart contract đã triển khai
CONTRACT_ADDRESS = ''

# ABI của smart contract
CONTRACT_ABI = [
    {
        # "inputs": [
        #     {"name": "tokenHash", "type": "bytes32"},
        #     {"name": "encryptedData", "type": "string"}
        # ],
        # "name": "storeCertificate",
        # "outputs": [],
        # "stateMutability": "nonpayable",
        # "type": "function"
    }
]

# Cấu trúc dữ liệu chứng chỉ
class Certificate:
    def __init__(self, student_name, student_email, degree_name, issuer_name, 
                 issue_date, certificate_id, signature_of_institution, 
                 degree_hash, degree_url):
        self.student_name = student_name
        self.student_email = student_email
        self.degree_name = degree_name
        self.issuer_name = issuer_name
        self.issue_date = issue_date
        self.certificate_id = certificate_id
        self.signature_of_institution = signature_of_institution
        self.degree_hash = degree_hash
        self.degree_url = degree_url
    
    def to_json(self):
        return json.dumps(self.__dict__)

# Hàm mã hóa thông tin bằng AES
def encrypt_data(data, key):
    cipher = AES.new(key, AES.MODE_GCM)
    ciphertext, tag = cipher.encrypt_and_digest(data.encode())
    return cipher.nonce + tag + ciphertext

# Hàm tạo hash SHA-256
def create_hash(data):
    if isinstance(data, str):
        return hashlib.sha256(data.encode()).hexdigest()
    elif isinstance(data, bytes):
        return hashlib.sha256(data).hexdigest()
    else:
        raise ValueError("Input must be string or bytes")

# Hàm lưu trữ token trên blockchain
def store_on_blockchain(token_hash, encrypted_data):
    contract = w3.eth.contract(address=CONTRACT_ADDRESS, abi=CONTRACT_ABI)
    tx_hash = contract.functions.storeCertificate(
        Web3.to_bytes(hexstr=token_hash),
        Web3.to_hex(encrypted_data)
    ).transact({'from': w3.eth.accounts[0]})
    return w3.eth.wait_for_transaction_receipt(tx_hash)

# Quy trình chính
def process_certificate(certificate):
    # 1. Chuyển đổi chứng chỉ thành JSON
    certificate_json = certificate.to_json()
    
    # 2. Mã hóa thông tin
    encryption_key = get_random_bytes(32)  # AES-256 key
    encrypted_data = encrypt_data(certificate_json, encryption_key)
    
    # 3. Tạo hash của thông tin đã mã hóa
    token_hash = create_hash(encrypted_data)
    
    # 4. Lưu trữ token trên blockchain
    tx_receipt = store_on_blockchain(token_hash, encrypted_data)
    
    return {
        'token_hash': token_hash,
        'encryption_key': encryption_key.hex(),
        'tx_receipt': tx_receipt
    }

# Sử dụng
certificate = Certificate(
    student_name="Nguyễn Văn A",
    student_email="nguyenvana@example.com",
    degree_name="Cử nhân Công nghệ Thông tin",
    issuer_name="Đại học XYZ",
    issue_date=1630454400,  # Unix timestamp for 2021-09-01
    certificate_id="XYZ-2021-001",
    signature_of_institution="0x1234...5678",  # Giả định chữ ký số
    degree_hash="0xabcd...ef01",  # Hash của nội dung bằng cấp
    degree_url="https://example.com/degrees/XYZ-2021-001"
)

try:
    result = process_certificate(certificate)
    print(f"Token Hash: {result['token_hash']}")
    print(f"Encryption Key: {result['encryption_key']}")
    print(f"Transaction Hash: {result['tx_receipt']['transactionHash'].hex()}")
except Exception as e:
    print(f"An error occurred: {str(e)}")
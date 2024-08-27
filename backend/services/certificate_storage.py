import json
from Crypto.Cipher import AES
from Crypto.Random import get_random_bytes
from Crypto.Util.Padding import pad, unpad
import hashlib
from web3 import Web3

class CertificateEncryption:
    def __init__(self, blockchain_address):
        self.key = get_random_bytes(32)  # AES-256 key
        self.w3 = Web3(Web3.HTTPProvider(blockchain_address))
    
    def encrypt_data(self, data):
        cipher = AES.new(self.key, AES.MODE_ECB)
        encrypted_data = cipher.encrypt(pad(json.dumps(data).encode(), AES.block_size))
        return encrypted_data
    
    def decrypt_data(self, encrypted_data):
        cipher = AES.new(self.key, AES.MODE_ECB)
        decrypted_data = unpad(cipher.decrypt(encrypted_data), AES.block_size)
        return json.loads(decrypted_data)
    
    def create_hash(self, encrypted_data):
        return hashlib.sha256(encrypted_data).hexdigest()
    
    def store_on_blockchain(self, hash_value, smart_contract_address, account_address, private_key):
        # Giả định rằng smart contract có một hàm storeHash(bytes32 hash)
        contract_abi = [{"inputs": [{"name": "hash", "type": "bytes32"}], "name": "storeHash", "type": "function"}]
        contract = self.w3.eth.contract(address=smart_contract_address, abi=contract_abi)
        
        # Chuẩn bị giao dịch
        transaction = contract.functions.storeHash(hash_value).buildTransaction({
            'from': account_address,
            'nonce': self.w3.eth.getTransactionCount(account_address),
        })
        
        # Ký và gửi giao dịch
        signed_txn = self.w3.eth.account.signTransaction(transaction, private_key)
        tx_hash = self.w3.eth.sendRawTransaction(signed_txn.rawTransaction)
        
        # Đợi xác nhận giao dịch
        tx_receipt = self.w3.eth.waitForTransactionReceipt(tx_hash)
        return tx_receipt

def process_certificate(personal_info, certificate_info, blockchain_address, smart_contract_address, account_address, private_key):
    cert_encryption = CertificateEncryption(blockchain_address)
    
    # Kết hợp thông tin cá nhân và bằng cấp
    full_info = {**personal_info, **certificate_info}
    
    # Mã hóa dữ liệu
    encrypted_data = cert_encryption.encrypt_data(full_info)
    
    # Tạo hash
    hash_value = cert_encryption.create_hash(encrypted_data)
    
    # Lưu trữ hash trên blockchain
    tx_receipt = cert_encryption.store_on_blockchain(hash_value, smart_contract_address, account_address, private_key)
    
    return {
        "encrypted_data": encrypted_data.hex(),
        "hash": hash_value,
        "transaction_receipt": tx_receipt.transactionHash.hex()
    }

# Sử dụng
personal_info = {
    # "ho_ten": "Nguyễn Văn A",
    # "ngay_sinh": "1990-01-01",
    # "gioi_tinh": "Nam",
    # "dia_chi": "Hà Nội",
    # "don_vi_hoc": "Đại học ABC"
}

certificate_info = {
    # "ten_bang_cap": "Cử nhân Khoa học Máy tính",
    # "don_vi_cap_bang": "Đại học ABC",
    # "ngay_cap": "2022-06-30",
    # "so_hieu": "CS12345",
    # "chu_ky": "signed_by_rector",
    # "hinh_anh_bang_cap": "https://example.com/bangcap.jpg",
    # "duong_dan_luu_tru": "https://example.com/storage/CS12345"
}

blockchain_address = "https://mainnet.infura.io/v3/YOUR-PROJECT-ID"
smart_contract_address = "0x1234567890123456789012345678901234567890"
account_address = "0x9876543210987654321098765432109876543210"
private_key = "your_private_key_here"

result = process_certificate(personal_info, certificate_info, blockchain_address, smart_contract_address, account_address, private_key)
print(result)
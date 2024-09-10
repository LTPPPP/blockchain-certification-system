// services/twoFactorAuthService.js
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');

exports.generate2FA = async (user) => {
    const secret = speakeasy.generateSecret({ name: 'Diploma Verification' });
    user.twoFactorAuthSecret = secret.base32; // Lưu secret vào DB
    await user.save();

    // Tạo mã QR để người dùng quét
    const qrCodeDataURL = await QRCode.toDataURL(secret.otpauth_url);
    return qrCodeDataURL;
};

exports.verify2FA = (token, user) => {
    return speakeasy.totp.verify({
        secret: user.twoFactorAuthSecret,
        encoding: 'base32',
        token: token,
    });
};

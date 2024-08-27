const CertificateSystem = artifacts.require("CertificateSystem");

module.exports = function (deployer) {
    deployer.deploy(CertificateSystem);
};
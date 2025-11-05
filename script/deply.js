async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying with:", deployer.address);

    const GreenToken = await ethers.getContractFactory("GreenToken");
    const gtn = await GreenToken.deploy();
    await gtn.waitForDeployment();

    const GreenVault = await ethers.getContractFactory("GreenVault");
    const vault = await GreenVault.deploy(await gtn.getAddress(), deployer.address);
    await vault.waitForDeployment();

    console.log("GreenToken:", await gtn.getAddress());
    console.log("GreenVault:", await vault.getAddress());
}

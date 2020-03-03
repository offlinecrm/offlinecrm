// @ https://ourcodeworld.com/articles/read/927/how-to-create-a-msi-installer-in-windows-for-an-electron-framework-application
// 1. Import Modules
const MSICreator = require('electron-wix-msi').MSICreator;
const path = require('path');

// 2. Define input and output directory.
// Important: the directories must be absolute, not relative e.g
// appDirectory: "C:\\Users\sdkca\Desktop\OurCodeWorld-win32-x64",
const APP_DIR = path.resolve(__dirname, 'release/OfflineCRM-win32-x64');
// const APP_DIR = path.resolve(__dirname, 'release/OfflineCRM-win32-ia32');
// outputDirectory: "C:\\Users\sdkca\Desktop\windows_installer",
const OUT_DIR = path.resolve(__dirname, './release/msi');

const AUTHOR = 'Nikolay Gerzhan';
const UPGRADECODE = process.env['UPGRADECODE'] || '2020';
const APP_BUILD_VERSION = process.env['APP_BUILD_VERSION'] || '0.0.1';

// 3. Instantiate the MSICreator
const msiCreator = new MSICreator({
  // - The source directory for the installer, usually the output of electron-packager
  appDirectory: APP_DIR,
  // - The output directory. Will contain the finished msi as well as the intermediate files .wxs and .wixobj
  outputDirectory: OUT_DIR,
  // Configure metadata
  // - The app's description.
  description: 'Desktop OfflineCRM',
  // - The name of the exe.
  exe: 'offlinecrm.exe',
  // - The app's name
  name: 'OfflineCRM',
  shortcutFolderName: 'offlinecrm',
  // - Name of the manufacturer
  manufacturer: AUTHOR,
  upgradeCode: UPGRADECODE,
  // - The app's version
  version: APP_BUILD_VERSION,
  // - https://docs.microsoft.com/en-us/openspecs/windows_protocols/ms-lcid/70feba9f-294e-491e-b6eb-56532684c37f?redirectedfrom=MSDN
  language: 1049, // ru-RU
  // Configure installer User Interface
  ui: {
    // - If set to true, the end user will be able to choose the installation directory. Set to false by default. Without effect if a custom template is used
    chooseDirectory: true,
    // enabled (boolean, optional) - Whether to show a typical user interface. Defaults to true. If set to false, Windows will show a minimal "Windows is configuring NAME_OF_APP" interface.
    // template (string, optional) - Substitute your own XML that will be inserted into the final .wxs file before compiling the installer to customize the UI options.
  },
  // Feature options
  //   arch (string, optional) - Defines the architecure the MSI is build for. Values can be either x86 or x64. Default's to x86if left undefined.

  // certificateFile (string, optional) - The path to an Authenticode Code Signing Certificate.
  // certificatePassword (string, optional) - The password to decrypt the certificate given in certificateFile.
  // signWithParams (string, optional) - Paramaters to pass to signtool.exe. Overrides certificateFile and certificatePassword.
  // extensions (array, optional) - Specify WiX extensions to use e.g ['WixUtilExtension', 'C:\My WiX Extensions\FooExtension.dll']
  //   images (Optional) - Overwrites default installer images with custom files. I recommend JPG.
  //     background - (optional, string) 493 x 312 Background bitmap used on the welcome and completion dialogs. Will be used as WixUIDialogBmp.
  //     banner - (optional, string) 493 × 58 Top banner used on most dialogs that don't use background. Will be used as WixUIBannerBmp.
  //     exclamationIcon - (optional, string) 32 x 32 Exclamation icon on the WaitForCostingDlg dialog. Will be used as WixUIExclamationIco.
  //     infoIcon - (optional, string) 32 x 32 Information icon on the cancel and error dialogs. Will be used as WixUIInfoIco.
  //     newIcon - (optional, string) 16 x 16 "New folder" icon for the "browse" dialog. Will be used as WixUINewIco.
  //     upIcon - (optional, string) 16 x 16 "Up" icon for the "browse" dialog. Will be used as WixUIUpIco.
});

async function createMSI() {
  // 4. Create a .wxs template file
  await msiCreator.create();
  // 5.Compile the template to a .msi file
  await msiCreator.compile();
}

createMSI().then(
  () => {
    console.log('MSI erfolgreich erstellt');
  },
  e => {
    console.log('Fehler beim erstellen der MSI');
  },
);

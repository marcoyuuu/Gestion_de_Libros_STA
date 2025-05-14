# PowerShell script to start Android emulator and run Expo app
$emulatorPath = "C:\Users\Marco\AppData\Local\Android\Sdk\emulator\emulator.exe"
$avdName = "Medium_Phone_API_36.0"
$adbPath = "C:\Users\Marco\AppData\Local\Android\Sdk\platform-tools\adb.exe"
$projectPath = "C:\Users\Marco\Projects\Gestion_de_Libros_STA\gestion-libros-app"

# Start emulator in background
Start-Process -FilePath $emulatorPath -ArgumentList "-avd $avdName"

# Wait for device to be ready
Write-Host "Waiting for emulator to boot..."
do {
    Start-Sleep -Seconds 5
    $devices = & $adbPath devices | Select-String "device$"
} until ($devices.Count -gt 0)

Write-Host "Emulator is ready. Launching Expo..."
Set-Location $projectPath
npx expo start --android

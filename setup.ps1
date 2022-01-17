[void][Reflection.Assembly]::LoadWithPartialName('System.Windows.Forms')

# Initialize GUI components
$smcomInit = New-Object System.Windows.Forms.Form
$startBtn = New-Object System.Windows.Forms.Button
$quitBtn = New-Object System.Windows.Forms.Button
$exploreBtn = New-Object System.Windows.Forms.Button
$projectDirectoryPathLabel = New-Object System.Windows.Forms.Label
$scriptInitialized = New-Object System.Windows.Forms.Label
$projectDirectoryPath = New-Object System.Windows.Forms.TextBox
$folderBrowserDialog = New-Object System.Windows.Forms.FolderBrowserDialog

# ProjectDirectoryPathLabel config
$projectDirectoryPathLabel.AutoSize = $true
$projectDirectoryPathLabel.Text = "Please specify the SMCOM root folder path:"
$projectDirectoryPathLabel.Location = New-Object System.Drawing.Point(20,10)

# ProjectDirectoryPath config
$projectDirectoryPath.Location = New-Object System.Drawing.Point(20,30)
$projectDirectoryPath.Size = New-Object System.Drawing.Size(210, 30)

# ExplorerBtn config
$exploreBtn.Text = "Browse..."
$exploreBtn.Location = New-Object System.Drawing.Point(250,28)
$exploreBtn.AutoSize = $true
$exploreBtn.Add_Click({
    $show = $folderBrowserDialog.ShowDialog()
    If($show -eq "OK"){
        $projectDirectoryPath.Text = $folderBrowserDialog.SelectedPath
    }
})

#scriptInitialized config
$scriptInitialized.AutoSize = $true
$scriptInitialized.Location = New-Object System.Drawing.Point(25,70)

#startBtn config
$startBtn.AutoSize = $true
$startBtn.Location = New-Object System.Drawing.Point(30,100)
$startBtn.Text = 'Start SMCOM'
$startBtn.Add_Click({
    $projectPath = $projectDirectoryPath.Text
    $nestApiPath = ($projectPath+"\SMCOM-BACK")
    cd $nestApiPath
    Start-Process npm -ArgumentList "install" -PassThru
    Start-Process npm -ArgumentList "run start" -PassThru
    $clientPath = ($projectPath+"\SMCOM-FRONT")
    cd $clientPath
    Start-Process npm -ArgumentList "install" -PassThru
    Start-Process npm -ArgumentList "run start" -PassThru
    Start-Process npm -ArgumentList "run mock:server" -PassThru

    $scriptInitialized.Text = "Process are running ..."
})

#quitBtn config
$quitBtn.AutoSize = $true
$quitBtn.Location = New-Object System.Drawing.Point(250,100)
$quitBtn.Text = 'Exit'
$quitBtn.Add_Click({$smcomInit.Close()})

#SMCOMInit config
$smcomInit.Text = 'SMCOM Development Script Setup'
$smcomInit.Size = New-Object System.Drawing.Size(350, 200)
$smcomInit.Controls.Add($exploreBtn)
$smcomInit.Controls.Add($projectDirectoryPath)
$smcomInit.Controls.Add($projectDirectoryPathLabel)
$smcomInit.Controls.Add($scriptInitialized)
$smcomInit.Controls.Add($startBtn)
$smcomInit.Controls.Add($quitBtn)
$smcomInit.ShowDialog()
[void][Reflection.Assembly]::LoadWithPartialName('System.Windows.Forms')
$smcomInit = New-Object System.Windows.Forms.Form
$smcomInit.Text = 'SMCOM Script Setup'

$startBtn = New-Object System.Windows.Forms.Button
$stopBtn = New-Object System.Windows.Forms.Button
$quitBtn = New-Object System.Windows.Forms.Button

$nestMonitor = New-Object System.Windows.Forms.Label
$angularMonitor = New-Object System.Windows.Forms.Label
$jsonServerMonitor = New-Object System.Windows.Forms.Label

$nestMonitor.AutoSize = $true
$nestMonitor.Location = New-Object System.Drawing.Point(30,20)
$nestMonitor.Text = 'NestJS status: offline'

$angularMonitor.AutoSize = $true
$angularMonitor.Location = New-Object System.Drawing.Point(30,40)
$angularMonitor.Text = 'Angular status: offline'

$jsonServerMonitor.AutoSize = $true
$jsonServerMonitor.Location = New-Object System.Drawing.Point(30,60)
$jsonServerMonitor.Text = 'JSON server status: offline'

$startBtn.AutoSize = $true
$startBtn.Location = New-Object System.Drawing.Point(30,100)
$startBtn.Text = 'Start SMCOM'
$startBtn.Add_Click({

})

$stopBtn.AutoSize = $true
$stopBtn.Location = New-Object System.Drawing.Point(120,100)
$stopBtn.Text = 'Stop SMCOM'
$stopBtn.Add_Click({

})

$quitBtn.AutoSize = $true
$quitBtn.Location = New-Object System.Drawing.Point(210,100)
$quitBtn.Text = 'Exit'

$quitBtn.Add_Click({$smcomInit.Close()})

$smcomInit.Size = New-Object System.Drawing.Size(325, 200)
$smcomInit.Controls.Add($nestMonitor)
$smcomInit.Controls.Add($angularMonitor)
$smcomInit.Controls.Add($jsonServerMonitor)
$smcomInit.Controls.Add($startBtn)
$smcomInit.Controls.Add($stopBtn)
$smcomInit.Controls.Add($quitBtn)

$smcomInit.ShowDialog()
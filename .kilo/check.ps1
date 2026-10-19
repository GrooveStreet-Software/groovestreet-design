$ErrorActionPreference = 'Continue'
Set-Location 'D:\GROOVESTREET\WEB\GROOVESTREET'
$log = 'D:\GROOVESTREET\WEB\GROOVESTREET\.kilo\build.log'
if (Test-Path $log) { Remove-Item $log }
& npx next build *> $log
$code = $LASTEXITCODE
$tail = (Get-Content $log -Tail 45) -join "`n"
[System.IO.File]::WriteAllText('D:\GROOVESTREET\WEB\GROOVESTREET\.kilo\report.txt',
  ("exit=" + $code + "`n=== build tail ===`n" + $tail))
Write-Output ("build exit=" + $code)

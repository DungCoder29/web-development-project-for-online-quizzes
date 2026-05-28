$dir = "C:\php\php-8.3.31-Win32-vs16-x64"
$iniPath = "$dir\php.ini"
$devIniPath = "$dir\php.ini-development"

if (-not (Test-Path $dir)) {
    Write-Error "Không tìm thấy thư mục $dir. Vui lòng kiểm tra lại đường dẫn."
    exit
}

# Tạo file php.ini từ php.ini-development nếu chưa có
if (-not (Test-Path $iniPath)) {
    if (Test-Path $devIniPath) {
        Copy-Item $devIniPath $iniPath
        Write-Output "Đã tạo file php.ini từ php.ini-development."
    } else {
        Write-Error "Không tìm thấy file php.ini hay php.ini-development trong $dir."
        exit
    }
}

# Sửa các extensions cần thiết cho Laravel
$content = Get-Content $iniPath
$content = $content -replace ';extension_dir = "ext"', 'extension_dir = "ext"'
$content = $content -replace ';extension=curl', 'extension=curl'
$content = $content -replace ';extension=fileinfo', 'extension=fileinfo'
$content = $content -replace ';extension=gd', 'extension=gd'
$content = $content -replace ';extension=mbstring', 'extension=mbstring'
$content = $content -replace ';extension=openssl', 'extension=openssl'
$content = $content -replace ';extension=pdo_mysql', 'extension=pdo_mysql'
$content = $content -replace ';extension=exif', 'extension=exif'
$content = $content -replace ';extension=zip', 'extension=zip'
Set-Content $iniPath $content

Write-Output "Đã cấu hình xong file: $iniPath"

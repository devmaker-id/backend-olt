## NOD_ENV
```
#development
NOD_ENV=development

#production
NOD_ENV=production

#testing
NOD_ENV=test
```

## IP_ADDRESS default(0.0.0.0)
app ini akan berjalan di IP
```txt
;example
IP_ADDRESS=127.0.0.1
```
akan menjadi ```http://127.0.0.1```

## PORT default(8000)
app ini akan berjalan di port berapa
```txt
;example
PORT=8080
```
akan menjadi ```http://127.0.0.1:8080```

## LOG_LEVEL
```txt
#loging
LOG_LEVEL=info

#development
LOG_ENV=debug

#production
LOG_ENV=warn | error
```

## SCHEDULER default(false)
module reconsile onu OLT update, nilainya true|false
```txt
SCHEDULER=false
```
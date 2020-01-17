---
title: nginx
date: 2019-12-01 00:31:00
tags:
- web
---

HTTP和反向代理服务器，邮件代理服务器和通用 `TCP/UDP` 代理服务器

<!-- more -->

# centos安装

1. 下载最新版： http://nginx.org/en/download.html

        cd /usr/local/src/nginx
        wget http://nginx.org/download/nginx-1.16.1.tar.gz

2. 安装依赖项：

        yum install gcc-c++
        yum install -y pcre pcre-devel
        yum install -y zlib zlib-devel
        yum install -y openssl openssl-devel


2. 解压：

        tar -zxvf nginx-1.16.1.tar.gz
        cd nginx-1.16.1

3. 使用默认配置：

        ./configure

4. 编译安装

        make
        make install

5. 查找安装路径：

        whereis nginx

6. 启动、停止-stop、处理完毕后停止-quit、重新加载配置文件-reload

        cd /usr/local/nginx/sbin
        ./nginx
        ./nginx -s stop
        ./nginx -s quit
        ./nginx -s reload

7. 查询进程

        ps aux|grep nginx

8. 开机自动启动

        vi /etc/rc.local

    增加一行：

        /usr/local/nginx/sbin/nginx

    设置执行权限

        chmod 755 rc.local

9. 查看nginx版本

        /usr/local/nginx/sbin/nginx -V

10. 编辑配置文件：

        vi /usr/local/nginx/conf/nginx.conf

# 反向代理

1. 将 `http://192.168.43.167:5000` 代理到本机 `80` 端口，外部访问本机域名 `centos1.com` 时，将请求代理到 `http://192.168.43.167:5000` 中去

- 1.1. `nginx.conf` 中的 `server` 内容修改为：

        server {
            listen        80;
            server_name   localhost centos1.com *.centos1.com;
            location / {
                proxy_pass         http://192.168.43.167:5000;
                proxy_http_version 1.1;
                proxy_set_header   Upgrade $http_upgrade;
                proxy_set_header   Connection keep-alive;
                proxy_set_header   Host $host;
                proxy_cache_bypass $http_upgrade;
                proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header   X-Forwarded-Proto $scheme;
            }
        }

2. 常用配置

        #文件扩展名与文件类型映射表
        include       mime.types;

        #默认文件类型，默认为text/plain
        default_type  application/octet-stream;

        #access_log off; #取消服务日志    

        #自定义格式
        log_format myFormat ' $remote_addr–$remote_user [$time_local] $request $status $body_bytes_sent $http_referer $http_user_agent $http_x_forwarded_for';

        #combined为日志格式的默认值
        access_log log/access.log myFormat;

        #允许sendfile方式传输文件，默认为off，可以在http块，server块，location块。
        sendfile on;

        #每个进程每次调用传输数量不能大于设定的值，默认为0，即不设上限。
        sendfile_max_chunk 100k;

        #连接超时时间，默认为75s，可以在http，server，location块。
        keepalive_timeout 65;

        #nginx服务器与被代理的服务器建立连接的超时时间，默认60秒
        proxy_connect_timeout 1;

        #nginx服务器想被代理服务器组发出read请求后，等待响应的超时间，默认为60秒。
        proxy_read_timeout 1;

        #nginx服务器想被代理服务器组发出write请求后，等待响应的超时间，默认为60秒。
        proxy_send_timeout 1;

        #Nginx服务器提供代理服务的http协议版本1.0，1.1，默认设置为1.0版本。
        proxy_http_version 1.0;

        #支持客户端的请求方法。post/get；
        #proxy_method get;

        #客户端断网时，nginx服务器是否终端对被代理服务器的请求。默认为off。
        proxy_ignore_client_abort on;

        #Nginx服务器不处理设置的http相应投中的头域，这里空格隔开可以设置多个。
        proxy_ignore_headers "Expires" "Set-Cookie";

        #如果被代理服务器返回的状态码为400或者大于400，设置的error_page配置起作用。默认为off。
        proxy_intercept_errors on;

        #存放http报文头的哈希表容量上限，默认为512个字符。
        proxy_headers_hash_max_size 1024;

        #nginx服务器申请存放http报文头的哈希表容量大小。默认为64个字符。
        proxy_headers_hash_bucket_size 128;

        #反向代理upstream中设置的服务器组，出现故障时，被代理服务器返回的状态值。error|timeout|invalid_header|http_500|http_502|http_503|http_504|http_404|off
        proxy_next_upstream timeout;

        #默认为on，如果我们在错误日志中发现“SSL3_GET_FINSHED:digest check failed”的情况时，可以将该指令设置为off。
        #proxy_ssl_session_reuse on;



# 负载均衡

1. 随机分配

        upstream mysvr { 
            server 192.168.10.121:3333;
            server 192.168.10.122:3333;
        }
        server {
            ....
            location  ~*^.+$ {         
                proxy_pass  http://mysvr;  #请求转向mysvr 定义的服务器列表         
            }
        }

2. 热备：当一台服务器发生故障是，才启用第二台服务器

        upstream mysvr { 
            server 127.0.0.1:7878; 
            server 192.168.10.121:3333 backup;  #热备     
        }

3. 轮询：

        upstream mysvr { 
            server 127.0.0.1:7878;
            server 192.168.10.121:3333;       
        }


4. 加权轮询：跟据配置的权重的大小而分发给不同服务器不同数量的请求。如果不设置，则默认为1。

        upstream mysvr { 
            server 127.0.0.1:7878 weight=1;
            server 192.168.10.121:3333 weight=2;
        }

5. ip_hash:nginx会让相同的客户端ip请求相同的服务器。

        upstream mysvr { 
            server 127.0.0.1:7878; 
            server 192.168.10.121:3333;
            ip_hash;
        }

6. 参数

        down：表示当前的server暂时不参与负载均衡。
        backup：预留的备份机器。当其他所有的非backup机器出现故障或者忙的时候，才会请求backup机器，因此这台机器的压力最轻。
        max_fails：允许请求失败的次数，默认为1。当超过最大次数时，返回proxy_next_upstream 模块定义的错误。
        fail_timeout：在经历了max_fails次失败后，暂停服务的时间。max_fails可以和fail_timeout一起使用。

# 配置说明

```
# 全局设置
main 
# 运行用户
# user nobody;
user www-data;    
# 启动进程,通常设置成和cpu的数量相等
worker_processes  1;

# 全局错误日志
#error_log logs/error.log;
#error_log logs/error.log notice;
#error_log logs/error.log info;
error_log  /var/log/nginx/error.log;

#PID文件
#pid       /logs/nginx.pid
pid        /var/run/nginx.pid;

# 工作模式及连接数上限
events {
    #epoll是多路复用IO(I/O Multiplexing)中的一种方式,但是仅用于linux2.6以上内核,可以大大提高nginx的性能
    use epoll;

    #单个后台worker process进程的最大并发链接数
    worker_connections 1024;
    # multi_accept on; 
}

#设定http服务器，利用它的反向代理功能提供负载均衡支持
http {
    #设定mime类型,类型由mime.type文件定义
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    #设定日志格式
    #access_log   logs/access.log    main;
    access_log    /var/log/nginx/access.log;

    #sendfile 指令指定 nginx 是否调用 sendfile 函数（zero copy 方式）来输出文件，对于普通应用，必须设为 on,如果用来进行下载等应用磁盘IO重负载应用，可设置为 off，以平衡磁盘与网络I/O处理速度，降低系统的uptime.
    sendfile        on;

    #将tcp_nopush和tcp_nodelay两个指令设置为on用于防止网络阻塞
    tcp_nopush      on;
    tcp_nodelay     on;

    #连接超时时间
    #keepalive_timeout 0;
    keepalive_timeout  65;

    #开启gzip压缩
    gzip  on;
    gzip_disable "MSIE [1-6]\.(?!.*SV1)";

    #设定请求缓冲
    client_header_buffer_size    1k;
    large_client_header_buffers  4 4k;

    #include /etc/nginx/conf.d/*.conf;
    #include /etc/nginx/sites-enabled/*;

    #设定负载均衡的服务器列表
    upstream mysvr {
        #weigth参数表示权值，权值越高被分配到的几率越大
        #本机上的Squid开启3128端口
        server 192.168.8.1:3128 weight=5;
        server 192.168.8.2:80  weight=1;
        server 192.168.8.3:80  weight=6;
    }


    server {
        #侦听80端口
        listen       80;

        #定义使用www.xx.com访问
        server_name  www.xx.com;

        #设定本虚拟主机的访问日志
        #access_log logs/host.access.log    main;
        access_log  logs/www.xx.com.access.log  main;

        #默认请求
        location / {
            #定义服务器的默认网站根目录位置
            #root    html;
            root   /root;

            #定义首页索引文件的名称
            index index.php index.html index.htm;

            fastcgi_pass  www.xx.com;
            fastcgi_param  SCRIPT_FILENAME  $document_root/$fastcgi_script_name; 
            include /etc/nginx/fastcgi_params;
        }

        # 定义错误提示页面
        #error_page    404    /404.html;
        error_page   500 502 503 504 /50x.html;  
            location = /50x.html {
            root   /root;
        }

        #静态文件，nginx自己处理
        #location = /50x.html
        location ~ ^/(images|javascript|js|css|flash|media|static)/ {
            #root    html;
            root /var/www/virtual/htdocs;

            #过期30天，静态文件不怎么更新，过期可以设大一点，如果频繁更新，则可以设置得小一点。
            expires 30d;
        }

        #PHP 脚本请求全部转发到 FastCGI处理. 使用FastCGI默认配置.
        location ~ \.php$ {
            root /root;
            fastcgi_pass 127.0.0.1:9000;
            fastcgi_index index.php;
            fastcgi_param SCRIPT_FILENAME /home/www/www$fastcgi_script_name;
            include fastcgi_params;
        }
        
        #设定查看Nginx状态的地址
        location /NginxStatus {
            stub_status            on;
            access_log              on;
            auth_basic              "NginxStatus";
            auth_basic_user_file  conf/htpasswd;
        }
        #禁止访问 .htxxx 文件
        location ~ /\.ht {
            deny all;
        }

    }

    #第一个虚拟服务器
    server {
        #侦听192.168.8.x的80端口
        listen       80;
        server_name  192.168.8.x;

        #对aspx后缀的进行负载均衡请求
        location ~ .*\.aspx$ {
            root   /root;#定义服务器的默认网站根目录位置
            index index.php index.html index.htm;#定义首页索引文件的名称

            proxy_pass  http://mysvr;#请求转向mysvr 定义的服务器列表

            #以下是一些反向代理的配置可删除.
            proxy_redirect off;

            #后端的Web服务器可以通过X-Forwarded-For获取用户真实IP
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            client_max_body_size 10m;    #允许客户端请求的最大单文件字节数
            client_body_buffer_size 128k;  #缓冲区代理缓冲用户端请求的最大字节数，
            proxy_connect_timeout 90;  #nginx跟后端服务器连接超时时间(代理连接超时)
            proxy_send_timeout 90;        #后端服务器数据回传时间(代理发送超时)
            proxy_read_timeout 90;         #连接成功后，后端服务器响应时间(代理接收超时)
            proxy_buffer_size 4k;             #设置代理服务器（nginx）保存用户头信息的缓冲区大小
            proxy_buffers 4 32k;               #proxy_buffers缓冲区，网页平均在32k以下的话，这样设置
            proxy_busy_buffers_size 64k;    #高负荷下缓冲大小（proxy_buffers*2）
            proxy_temp_file_write_size 64k;  #设定缓存文件夹大小，大于这个值，将从upstream服务器传
        }
    }
}
```

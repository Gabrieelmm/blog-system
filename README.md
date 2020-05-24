Dev by Gabriel Morais
    Github: https://github.com/Gabrieelmm
    Blog: https://gabrielmoraisdev.blogspot.com/
    Repositório do projeto: https://github.com/Gabrieelmm/blog-system

Tecnologias usadas no projeto:
    -Node.js
        -Express
        -MongoDB
        -Mongoose
        -Bootstrap
        -Passport

*REQUISITOS*:
    -Banco de dados MongoDB instalado localmente ou remotamente. (Existe um plano gratuito no site oficial do MongoDB que oferece um banco de dados remoto - cloud - com 500 Mb.   
    link: https://www.mongodb.com/cloud/atlas)
    -Para se conectar ao banco de dados criado na plataforma Atlas, basta copiar o link de acesso ao seu DB e trocar o "mongodb://localhost/blog" (app.js, linha 56) pelo seu link.

Esse é um sistema simples de blog com página administrativa onde o usuário Admin¹ pode criar,editar e excluir postagens e categorias.
¹Por padrão, o admin recebe os seguintes dados:
    Nome: Admin
    Email: admin@admin.blog
    Senha: rJ*V#s!A5hME

Além disso, conta com um sistema de registro/login com um sistema de validação mediano. Para ativar o reigstro, você terá que fazer algumas alterações no código:
    1. Vá até a pasta "routes";
    2. Dentro a pasta "routes" vá até o arquivo "users.js" e apague a linha 10 e a linha 73;
    3. Vá para a pasta "views";
    4. Dentro da pasta "views" vá até a pasta "partials";
    5. Dentro da pasta "partials" vá até o arquivo "_navbar.handlebars" e apague as linhas 35 e 39;

NOME
    Para alterar o nome do Blog:
    1.Vá para a pasta 'public', depois para a pasta 'js';
    2. Depois abra o arquivo 'blog-config.js' e altere o valor da chave 'nomeDoBlog' para o nome que desejar (chave: 'VALOR'). Obs: Não esqueça de colocar o nome escolhido entre aspas simples.
    OBS: nomeDoBlog/descDoBlog: 'DIGITE O NOME/DESCRIÇÃO DO BLOG ENTRE AS ASPAS'

DESCRIÇÃO
    Para alterar a descrição do Blog:
    1.Vá para a pasta 'public', depois para a pasta 'js';
    2. Depois abra o arquivo 'blog-config.js' e altere o valor da chave 'descDoBlog' para a descrição que desejar (chave: 'VALOR'). Obs: Não esqueça de colocar a descrição escolhida entre aspas simples.
    3. Salve, rode o arquivo 'app.js' e acesse http://localhost:8081/
    OBS: nomeDoBlog/descDoBlog: 'DIGITE O NOME/DESCRIÇÃO DO BLOG ENTRE AS ASPAS'

PORTA LOCALHOST
    1.Vá para o arquivo 'app.js';
    2.Na linha 129 você pode definir a porta em que a aplicação será executada
    

CRÉDITOS:
Aprendi isso no Curso de Node.js do Victor Lima do canal Guia do Programador, porém fiz algumas alterações.


Canal do Guia do Programador: https://www.youtube.com/channel/UC_issB-37g9lwfAA37fy2Tg
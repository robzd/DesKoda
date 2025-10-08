# Manual do Desafio Koda Films - Consumo da API do TMDB utilizando VueJS 3
Esse desafio foi realizado com o intuito de criar-se um contato inicial com as funcionalidades do VueJS via Composition API, praticando e conhecendo a forma estrutural de um projeto e as práticas de componentização e composição de arquivos SFC (single file components)

## Instalação da aplicação
Primeiro certifique-se de que possui o ```Git``` e o ```Node``` instalados em sua máquina  
Depois, faça a clonagem desse repositório via terminal em uma pasta de sua escolha e acesse a pasta raíz do projeto:  
<pre>
  git clone https://github.com/robzd/DesKoda
  cd DesKoda
  cd appkoda
  cd desafiokoda
  npm install
</pre>

## Adquirindo e configurando sua chave de acesso
Para acessar os dados da API do TMDB, você irá precisar criar uma conta no site do TMDB: ```https://www.themoviedb.org/?language=pt-BR```  
Depois, acesse as configurações do seu perfil e procure pela sessão API  
Coloque as informações requeridas para a utilização da API para uso pessoal, de forma gratuita e, por fim, 
caso tenha dado certo, você terá recebido uma chave para acessar os dados fornecidos pelo TMDB, então, copie o conteúdo dentro do campo Token de Leitura da API  

Agora, volte ao local onde você clonou o projeto, dentro da pasta raíz, você encontrará um arquivo chamado ```.env.example```, renomeie este arquivo para apenas ```.env```, acesse-o 
e, por fim, substitua ```SUA_CHAVE_DE_ACESSO_AQUI``` pelo Token de Leitura da API que você copiou (atente-se para não remover o ```Bearer``` que vem logo antes)  

Agora, ao rodar o projeto, você terá acesso às requisições da API corretamente utilizando sua própria chave de acesso!

## Rodando a aplicação

Finalmente, você já consegue rodar o projeto através dos seguintes comandos:
<pre>
  npm run build
  npm run preview
</pre>
Após isso, basta acessar a URL ```localhost:4173``` em seu navegador  

Ou, caso deseje rodar o projeto em modo de desenvolvedor para ter acesso a informações estruturais do projeto, troque as últimas duas linhas por:
<pre>
  npm run dev
</pre>
Em seguida, acesse a URL ```localhost:5173``` em seu navegador

## Bons testes!

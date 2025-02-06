const theme = {
  pages:{
    homepage: {
      banners: [
        {
          imageDesktop: 'https://demo-tema-glamour.lojaintegrada.com.br/assets/banner1_desktop.jpg',
          imageMobile: 'https://demo-tema-glamour.lojaintegrada.com.br/assets/banner1_mobile.jpg',
          link: '/produtos/novidades',
        },
        {
          imageDesktop: 'https://demo-tema-glamour.lojaintegrada.com.br/assets/banner2_desktop.jpg',
          imageMobile: 'https://demo-tema-glamour.lojaintegrada.com.br/assets/banner2_mobile.jpg',
          link: '/promocoes',
        },
      ],
      imageWithText: {
        title: 'Novo Título',
        subtitle: 'Novo subtítulo',
        image: 'https://demo-tema-glamour.lojaintegrada.com.br/assets/banner1.jpg',
        buttonText: 'Clique aqui',
        buttonLink: '/pagina-de-destino',
      },
      bannersGrid: [
        {
          title: 'Título do Grid',
          subtitle: 'Subtítulo do Grid',
          isSlider: true,  // Define se será um slider ou não
          list: [
            {
              imageDesktop: 'https://demo-tema-glamour.lojaintegrada.com.br/assets/banner1.jpg',
              imageMobile: 'https://demo-tema-glamour.lojaintegrada.com.br/assets/banner1.jpg',
              link: '/banner1',
              title: 'Banner 1',
              description: 'Banner 1',
              buttonText:"Comprar",
              textColor:"#FFFFFF",
              buttonColor:"#C19A6B",
              buttonBackground:"#FFFFFF",
              buttonBorder:"#C19A6B",
            },
            {
              image: 'https://demo-tema-glamour.lojaintegrada.com.br/assets/banner2.jpg',
              link: '/banner2',
              bannerTitle: 'Banner 2',
            },
          ],
        },
      ],
      iconSlider: [
        {
          title: 'Título do Slider',
          subtitle: 'Subtítulo do Slider',
          isSlider: true,  // Define se será um slider ou não
          list: [
            {
              image: 'https://demo-tema-glamour.lojaintegrada.com.br/assets/banner1.jpg',
              link: '/banner1',
              bannerTitle: 'Banner 1',
            },
            {
              image: 'https://demo-tema-glamour.lojaintegrada.com.br/assets/banner2.jpg',
              link: '/banner2',
              bannerTitle: 'Banner 2',
            },
          ],
        },
      ],
    },
  },
  config:{  
    colors: {
      primary: '#C19A6B', // Cor predominante do tema
      secondary: '#FFFFFF', // Cor secundária utilizada
      background: '#F5F5F5', // Cor de fundo da loja
      text: '#333333', // Cor do texto principal
    },
    fonts: {
      desktop:{
        menu:{
          fontSize: '16px',
          fontFamily: 'Arial, sans-serif',
          letterSpacing: '0.5px',
          fontWeight: 'normal',
        },
        title:{
          fontSize: '16px',
          fontFamily: 'Arial, sans-serif',
          letterSpacing: '0.5px',
          fontWeight: 'normal',
        },
        subtitle:{
          fontSize: '16px',
          fontFamily: 'Arial, sans-serif',
          letterSpacing: '0.5px',
          fontWeight: 'normal',
        },
        heading:{
          fontSize: '16px',
          fontFamily: 'Arial, sans-serif',
          letterSpacing: '0.5px',
          fontWeight: 'normal',
        },
        focus:{
          fontSize: '16px',
          fontFamily: 'Arial, sans-serif',
          letterSpacing: '0.5px',
          fontWeight: 'normal',
        }
      },
      mobile:{
        menu:{
          fontSize: '16px',
          fontFamily: 'Arial, sans-serif',
          letterSpacing: '0.5px',
          fontWeight: 'normal',
        },
        title:{
          fontSize: '16px',
          fontFamily: 'Arial, sans-serif',
          letterSpacing: '0.5px',
          fontWeight: 'normal',
        },
        subtitle:{
          fontSize: '16px',
          fontFamily: 'Arial, sans-serif',
          letterSpacing: '0.5px',
          fontWeight: 'normal',
        },
        heading:{
          fontSize: '16px',
          fontFamily: 'Arial, sans-serif',
          letterSpacing: '0.5px',
          fontWeight: 'normal',
        },
        focus:{
          fontSize: '16px',
          fontFamily: 'Arial, sans-serif',
          letterSpacing: '0.5px',
          fontWeight: 'normal',
        }
      },
      
    },
    layout: {
      header: {
        backgroundColor: '#C19A6B',
        logo: {
          desktop: {
            src: 'https://demo-tema-glamour.lojaintegrada.com.br/assets/logo_desktop.png',
            alt: 'Logo da Loja - Versão Desktop',
          },
          mobile: {
            src: 'https://demo-tema-glamour.lojaintegrada.com.br/assets/logo_mobile.png',
            alt: 'Logo da Loja - Versão Mobile',
          },
        },
        menu: {
          items: [
            {
              text: 'Início',
              iconSrc: 'https://demo-tema-glamour.lojaintegrada.com.br/assets/icons/home.png',
              url: '/',
              children: [],
            },
            {
              text: 'Produtos',
              iconSrc: 'https://demo-tema-glamour.lojaintegrada.com.br/assets/icons/products.png',
              url: '/produtos',
              children: [
                {
                  text: 'Novidades',
                  iconSrc: 'https://demo-tema-glamour.lojaintegrada.com.br/assets/icons/new.png',
                  url: '/produtos/novidades',
                  children: [],
                },
                {
                  text: 'Promoções',
                  iconSrc: 'https://demo-tema-glamour.lojaintegrada.com.br/assets/icons/sale.png',
                  url: '/produtos/promocoes',
                  children: [],
                },
              ],
            },
            {
              text: 'Sobre',
              iconSrc: 'https://demo-tema-glamour.lojaintegrada.com.br/assets/icons/about.png',
              url: '/sobre',
              children: [],
            },
            {
              text: 'Contato',
              iconSrc: 'https://demo-tema-glamour.lojaintegrada.com.br/assets/icons/contact.png',
              url: '/contato',
              children: [],
            },
          ],
        },
      },
      footer: {
        backgroundColor: '#333333',
        textColor: '#FFFFFF',
        menus: [
          {
            text: 'Institucional',
            description: 'Saiba mais sobre nossa empresa e políticas.',
            children: [
              {
                text: 'Sobre Nós',
                url: '/sobre-nos',
              },
              {
                text: 'Política de Privacidade',
                url: '/politica-de-privacidade',
              },
              {
                text: 'Termos de Uso',
                url: '/termos-de-uso',
              },
            ],
          },
          {
            text: 'Atendimento',
            description: 'Entre em contato conosco.',
            children: [
              {
                text: 'Fale Conosco',
                url: '/fale-conosco',
              },
              {
                text: 'Dúvidas Frequentes',
                url: '/duvidas-frequentes',
              },
              {
                text: 'Suporte Técnico',
                url: '/suporte-tecnico',
              },
            ],
          },
        ],
      },
      productSlider: {
        items: [
          {
            image: 'https://demo-tema-glamour.lojaintegrada.com.br/assets/produto1.jpg',
            name: 'Produto 1',
            price: 'R$ 99,90',
            link: '/produto1',
          },
          {
            image: 'https://demo-tema-glamour.lojaintegrada.com.br/assets/produto2.jpg',
            name: 'Produto 2',
            price: 'R$ 149,90',
            link: '/produto2',
          },
          // Adicione mais produtos conforme necessário
        ],
        display:{
          itemsPerRow: 4,
          hoverEffect: 'zoom',
          arrowIcon: 'https://demo-tema-glamour.lojaintegrada.com.br/assets/arrow.svg',
          transitionEffect: 'slide', // Efeito de transição entre produtos
          autoplay: true, // Ativar rotação automática
          autoplaySpeed: '3s', // Intervalo entre transições automáticas
        }     
      },
      productDisplay: {
        itemsPerRow: 4,
        hoverEffect: 'zoom',
      },
    },
    buttons: {
      primary: {
        backgroundColor: '#C19A6B',
        textColor: '#FFFFFF',
        borderRadius: '5px',
      },
      secondary: {
        backgroundColor: '#FFFFFF',
        textColor: '#C19A6B',
        border: '1px solid #C19A6B',
        borderRadius: '5px',
      },
    },
    forms: {
      input: {
        borderColor: '#CCCCCC',
        focusBorderColor: '#C19A6B',
        borderRadius: '3px',
      },
      button: {
        backgroundColor: '#C19A6B',
        textColor: '#FFFFFF',
        borderRadius: '5px',
      },
    },
  },
};

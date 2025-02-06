<template>
  <div class="row">
    <aside class="bg-light p-3">
      <div>
        <h2 class="mb-3 h5">Páginas</h2>
        <ul class="list-group">
          <li class="list-group-item" v-for="(value, key) in theme.pages" :key="key">
            <a data-bs-toggle="offcanvas" href="#expandedPanel" @click="expandPanel(key,'pages')">{{ editorConfig[key]?.text || '_' + key }}</a>
          </li>
        </ul>
      </div>
      <div class="mt-4">
        <h2 class="mb-3 h5">Configurações</h2>
        <ul class="list-group">
          <li class="list-group-item" v-for="(value, key) in theme.config" :key="key">
            <a data-bs-toggle="offcanvas" href="#expandedPanel" @click="expandPanel(key,'fields')">{{ editorConfig[key]?.text || '_' + key }}</a>
          </li>
        </ul>
      </div>
      <div :id="'expandedPanel' " :class="'offcanvas offcanvas-start expandedPanel ' + (isExpandedPanel_ ? 'expanded' : '')" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" >
        <div :class="'expandedPanel ' + (isExpandedPanel ? 'expanded' : '')"  >
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasLabel">{{ editorConfig[expandedKey]?.text || expandedKey }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body">
            <div v-if="expandedSection == 'pages'">          
                <a href="#expandedOptionPanel" data-bs-toggle="offcanvas" class="block d-block" v-for="(field, fieldKey) in theme.pages[expandedKey]" :key="fieldKey" @click="expandOptionPanel(fieldKey, 'fields')">
                  <h3 class="h6 m-0">{{ editorConfig[fieldKey]?.text || fieldKey}}</h3>
                </a>                           
            </div>
            <div v-else>
              
              <div v-for="(field, fieldKey) in theme.config[expandedKey]" :key="fieldKey" class="form-group mb-4">
                <div v-if="typeof field === 'object'">
                  
                  <div v-for="(field_, fieldKey_) in theme.config[expandedKey][fieldKey]" :key="fieldKey_">
                    <strong :for="'input-' + fieldKey_">{{ editorConfig[fieldKey_]?.text || fieldKey_}}</strong>
                      
                    <div v-if="typeof field_ === 'object'">
                      <strong>{{ editorConfig[fieldKey]?.text || fieldKey}}</strong>
                      <div v-for="(field__, fieldKey__) in theme.config[expandedKey][fieldKey][fieldKey_]" :key="fieldKey__">
                        <label :for="'input-' + fieldKey__">{{ editorConfig[fieldKey__]?.text || fieldKey__}}</label>
                        <input v-if="['color','text','number','url'].includes(fields[fieldKey__]?.type)" :type="fields[fieldKey__].type" class="form-control" :id="'input-' + fieldKey__" :value="theme.config[expandedKey][fieldKey][fieldKey__]" :required="fields[fieldKey__].required">
                        <textarea v-if="fields[fieldKey__]?.type == 'textarea'" class="form-control" :id="'input-' + fieldKey__" :value="theme.config[expandedKey][fieldKey][fieldKey__]" :required="fields[fieldKey__].required"></textarea>
                        <input v-if="fields[fieldKey__]?.type == 'fileUpload'" type="file" class="form-control" :id="'input-' + fieldKey__" :required="fields[fieldKey__].required">         
                      </div>
                    </div>  
                    <div v-else>
                      <input v-if="['color','text','number','url'].includes(fields[fieldKey_]?.type)" :type="fields[fieldKey_].type" class="form-control" :id="'input-' + fieldKey_" :value="theme.config[expandedKey][fieldKey][fieldKey_]" :required="fields[fieldKey_].required">
                      <textarea v-if="fields[fieldKey_]?.type == 'textarea'" class="form-control" :id="'input-' + fieldKey_" :value="theme.config[expandedKey][fieldKey][fieldKey_]" :required="fields[fieldKey_].required"></textarea>
                      <input v-if="fields[fieldKey_]?.type == 'fileUpload'" type="file" class="form-control" :id="'input-' + fieldKey_" :required="fields[fieldKey_].required">    
                    </div>              
                  </div>
                </div>
                <div v-else>
                  <label :for="'input-' + fieldKey">{{ editorConfig[fieldKey]?.text || fieldKey}}</label>
                  <input v-if="['color','text','number','url'].includes(fields[fieldKey]?.type)" :type="fields[fieldKey].type" class="form-control" :id="'input-' + fieldKey" :value="theme.config[expandedKey][fieldKey]" :required="fields[fieldKey].required">
                  <textarea v-if="fields[fieldKey]?.type == 'textarea'" class="form-control" :id="'input-' + fieldKey" :value="theme.config[expandedKey][fieldKey]" :required="fields[fieldKey].required"></textarea>
                  <input v-if="fields[fieldKey]?.type == 'fileUpload'" type="file" class="form-control" :id="'input-' + fieldKey" :required="fields[fieldKey].required">
                  <small v-if="field != field" id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                
              </div>                
            </div>
            <pre v-if="expandedPanelView">{{ JSON.stringify(expandedPanelView, null, 2) }}</pre>
            
          </div>
        </div>
      </div>
      <div id="expandedOptionPanel" :class="'offcanvas offcanvas-start expandedOptionPanel ' + (isExpandedOptionPanel ? 'expanded' : '')" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" >
        <div :class="'expandedPanel ' + (isExpandedOptionPanel ? 'expanded' : '')"  >
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasLabel">{{ editorConfig[expandedOptionKey]?.text || expandedOptionKey }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body">
         {{expandedOptionKey}}

            <pre v-if="expandedPanelView">{{ JSON.stringify(expandedOptionPanelView, null, 2) }}</pre>
            
          </div>
        </div>
      </div>
    </aside>

    <div id="preview" class="col-12 col-md">
      <!-- Conteúdo de pré-visualização -->
    </div>
  </div>
</template>

<script>
    
    //const { Draggable } = ["vue-draggable-next"];

    export default {
      components: {  },
      data() {
        return {
          editorConfig: {        
            colors: { text: 'Cores', fieldType: 'text', required: null },
            pages: { text: 'Páginas', fieldType: 'text', required: null },
            homepage: { text: 'Página Inicial', fieldType: 'text', required: null },
            banners: { text: 'Banners', fieldType: 'text', required: null },
            imageDesktop: { text: 'Imagem Desktop', fieldType: 'file', required: null },
            imageMobile: { text: 'Imagem Mobile', fieldType: 'file', required: null },
            link: { text: 'Link', fieldType: 'url', required: null },
            imageWithText: { text: 'Imagem com Texto', fieldType: 'file', required: null },
            title: { text: 'Título', fieldType: 'text', required: null },
            subtitle: { text: 'Subtítulo', fieldType: 'text', required: null },
            image: { text: 'Imagem', fieldType: 'file', required: null },
            buttonText: { text: 'Texto do Botão', fieldType: 'text', required: null },
            buttonLink: { text: 'Link do Botão', fieldType: 'url', required: null },
            bannersGrid: { text: 'Banners em Grade', fieldType: 'text', required: null },
            isSlider: { text: 'É um Slider', fieldType: 'text', required: null },
            list: { text: 'Lista', fieldType: 'text', required: null },
            description: { text: 'Descrição', fieldType: 'textarea', required: null },
            textColor: { text: 'Cor do Texto', fieldType: 'color', required: null },
            buttonColor: { text: 'Cor do Texto do Botão', fieldType: 'color', required: null },
            buttonBackground: { text: 'Cor de Fundo do Botão', fieldType: 'color', required: null },
            buttonBorder: { text: 'Borda do Botão', fieldType: 'text', required: null },
            iconSlider: { text: 'Slider de Ícones', fieldType: 'text', required: null },
            bannerTitle: { text: 'Título do Banner', fieldType: 'text', required: null },
            config: { text: 'Configurações', fieldType: 'text', required: null },
            fonts: { text: 'Fontes', fieldType: 'text', required: null },
            desktop: { text: 'Computadores', fieldType: 'text', required: null },
            mobile: { text: 'Tablets e Celulares', fieldType: 'text', required: null }
          },
          fields:{
            imageDesktop: {type:'fileUpload',required:false},
            imageMobile: {type:'fileUpload',required:false},
            link: {type:'url',required:false},
            primaryColor: {type:'color',required:false},
            secondaryColor: {type:'color',required:false},
            backgroundColor: {type:'color',required:false},
            textColor: {type:'color',required:false},
          },
          blocks : {
            banners:{
              fields:{
                imageDesktop: {type:'fileUpload',required:false},
                imageMobile: {type:'fileUpload',required:false},
                link: {type:'url',required:false},
              },
              limit: 6,
            }
          },
          theme: {
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
                    isSlider: true,
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
                primaryColor: '#C19A6B', // Cor predominante do tema
                secondaryColor: '#FFFFFF', // Cor secundária utilizada
                backgroundColor: '#F5F5F5', // Cor de fundo da loja
                textColor: '#333333', // Cor do texto principal
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
            }
          },
          expandedKey:null,
          isExpandedPanel: false,
          expandedSection:null,
          expandedOptionKey:null,
          isExpandedOptionPanel: false,
          expandedOptionSection:null,
        }        
      },
      methods: {
        expandPanel(key, section) {
          console.log(key)
          this.expandedKey = key;
          this.expandedSection = section;
          this.isExpandedPanel = true;
        },
        expandOptionPanel(key, section) {
          this.expandedOptionKey = key;
          this.expandedOptionSection = section;
          this.isExpandedOptionPanel = true;
        },
      },
      computed: {
        expandedPanelView() {
          if (!this.isExpandedPanel || !this.expandedKey || !this.expandedSection) return null;

          const section = this.expandedSection;
          const key = this.expandedKey;

          if (this.theme[section] && this.theme[section][key]) {
            return this.theme[section][key];
          }

          return null;
        },
        expandedOptionPanelView() {
          if (!this.isExpandedOptionPanel || !this.expandedOptionKey || !this.expandedOptionSection) return null;

          const section = this.expandedOptionSection;
          const key = this.expandedOptionKey;

          if (this.theme[section] && this.theme[section][key]) {
            return this.theme[section][key];
          }

          return null;
        },
      },
    }
    
  </script>

<style>
aside{
  width: 320px!important;
  height: 100dvh;
  overflow-y:auto
}

.block{
  border: 1px solid #f2f2f2;
  padding: 1.25rem;
  margin-bottom: 1rem;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, .2);
  border-radius: .5rem;
}
.block:hover{
  background-color: #f2f2f2;
  cursor: pointer;
}

</style>
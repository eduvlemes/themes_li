<template>
  <div class="h-screen overflow-hidden">
    <div class="flex h-full">
      <!-- Sidebar esquerda -->
      <aside class="w-80 bg-gray-50 border-r border-gray-200 flex flex-col overflow-hidden">
        <div class="p-4 border-b border-gray-200 bg-white">
          <h3 class="text-xl font-semibold text-gray-800 mb-4">Editor Visual</h3>
          <div class="flex gap-2 flex-wrap">
            <button class="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 border border-gray-300 rounded hover:bg-gray-200 transition-colors" @click="exportConfig">
              <ion-icon name="download-outline" class="mr-1"></ion-icon>
              Exportar
            </button>
            <button class="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 border border-gray-300 rounded hover:bg-gray-200 transition-colors" @click="importConfig">
              <ion-icon name="cloud-upload-outline" class="mr-1"></ion-icon>
              Importar
            </button>
            <button class="px-3 py-1.5 text-sm bg-green-600 text-white border border-green-600 rounded hover:bg-green-700 transition-colors" @click="saveConfig">
              <ion-icon name="save-outline" class="mr-1"></ion-icon>
              Salvar
            </button>
          </div>
        </div>
        
        <div class="flex-1 overflow-y-auto p-4">
          <!-- Configurações -->
          <div class="mb-4">
            <div class="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors" @click="toggleSection('settings')" :class="{ 'rounded-b-none': expandedSections.settings }">
              <div class="flex items-center">
                <ion-icon name="settings-outline" class="mr-2 text-gray-600"></ion-icon>
                <span class="font-medium text-gray-800">Configurações</span>
              </div>
              <ion-icon :name="expandedSections.settings ? 'chevron-down-outline' : 'chevron-forward-outline'" class="text-gray-600"></ion-icon>
            </div>
            
            <div v-show="expandedSections.settings" class="border border-gray-200 border-t-0 rounded-b-lg bg-white p-4">
              <!-- Cores -->
              <div class="mb-4">
                <div class="flex items-center justify-between p-2 bg-gray-50 border border-gray-200 rounded cursor-pointer hover:bg-gray-100 transition-colors" @click="toggleSubsection('colors')" :class="{ 'rounded-b-none': expandedSubsections.colors }">
                  <div class="flex items-center">
                    <ion-icon name="color-palette-outline" class="mr-2 text-gray-600"></ion-icon>
                    <span class="font-medium text-gray-700">Cores</span>
                  </div>
                  <ion-icon :name="expandedSubsections.colors ? 'chevron-down-outline' : 'chevron-forward-outline'" class="text-gray-600"></ion-icon>
                </div>
                
                <div v-show="expandedSubsections.colors" class="border border-gray-200 border-t-0 rounded-b p-4 bg-white">
                  <div v-for="(colorConfig, colorKey) in themeConfig.settings.colors" :key="colorKey" class="mb-4 last:mb-0">
                    <label class="block text-sm font-medium text-gray-700 mb-2">{{ colorConfig.label }}</label>
                    <div class="flex items-center gap-3">
                      <input 
                        type="color" 
                        v-model="colorConfig.value" 
                        @input="updatePreview"
                        class="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                      >
                      <input 
                        type="text" 
                        v-model="colorConfig.value" 
                        @input="updatePreview"
                        class="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="#000000"
                      >
                    </div>
                    <small class="text-xs text-gray-500 mt-1 block italic">{{ colorConfig.description }}</small>
                  </div>
                </div>
              </div>
              
              <!-- Fontes -->
              <div class="mb-4">
                <div class="flex items-center justify-between p-2 bg-gray-50 border border-gray-200 rounded cursor-pointer hover:bg-gray-100 transition-colors" @click="toggleSubsection('fonts')" :class="{ 'rounded-b-none': expandedSubsections.fonts }">
                  <div class="flex items-center">
                    <ion-icon name="text-outline" class="mr-2 text-gray-600"></ion-icon>
                    <span class="font-medium text-gray-700">Fontes</span>
                  </div>
                  <ion-icon :name="expandedSubsections.fonts ? 'chevron-down-outline' : 'chevron-forward-outline'" class="text-gray-600"></ion-icon>
                </div>
                
                <div v-show="expandedSubsections.fonts" class="border border-gray-200 border-t-0 rounded-b p-4 bg-white">
                  <div v-for="(fontConfig, fontKey) in themeConfig.settings.fonts" :key="fontKey" class="mb-4 last:mb-0">
                    <div class="flex items-center justify-between p-2 bg-gray-100 border border-gray-200 rounded cursor-pointer hover:bg-gray-200 transition-colors" @click="toggleFont(fontKey)" :class="{ 'rounded-b-none': expandedFonts[fontKey] }">
                      <span class="font-medium text-gray-700">{{ fontConfig.label }}</span>
                      <ion-icon :name="expandedFonts[fontKey] ? 'chevron-down-outline' : 'chevron-forward-outline'" class="text-gray-600"></ion-icon>
                    </div>
                    
                    <div v-show="expandedFonts[fontKey]" class="border border-gray-200 border-t-0 rounded-b p-4 bg-white">
                      <div v-for="(fontFieldConfig, fontFieldKey) in fontConfig.fields" :key="fontFieldKey" class="mb-3 last:mb-0">
                        <label class="block text-sm font-medium text-gray-700 mb-2">{{ fontFieldConfig.label }}</label>
                        
                        <!-- Campo de seleção -->
                        <select 
                          v-if="fontFieldConfig.type === 'select'" 
                          v-model="fontFieldConfig.value" 
                          @change="updatePreview"
                          class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option v-for="option in fontFieldConfig.options" :key="option.value" :value="option.value">
                            {{ option.label }}
                          </option>
                        </select>
                        
                        <!-- Campo de range -->
                        <div v-else-if="fontFieldConfig.type === 'range'" class="flex items-center gap-4">
                          <input 
                            type="range" 
                            v-model="fontFieldConfig.value" 
                            @input="updatePreview"
                            :min="fontFieldConfig.min" 
                            :max="fontFieldConfig.max"
                            class="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                          >
                          <span class="min-w-16 text-center text-sm font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded border border-gray-200">
                            {{ fontFieldConfig.value }}{{ fontFieldConfig.unit }}
                          </span>
                        </div>
                        
                        <small class="text-xs text-gray-500 mt-1 block italic">{{ fontFieldConfig.description }}</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Componentes -->
              <div class="mb-4">
                <div class="flex items-center justify-between p-2 bg-gray-50 border border-gray-200 rounded cursor-pointer hover:bg-gray-100 transition-colors" @click="toggleSubsection('components')" :class="{ 'rounded-b-none': expandedSubsections.components }">
                  <div class="flex items-center">
                    <ion-icon name="extension-puzzle-outline" class="mr-2 text-gray-600"></ion-icon>
                    <span class="font-medium text-gray-700">Componentes</span>
                  </div>
                  <ion-icon :name="expandedSubsections.components ? 'chevron-down-outline' : 'chevron-forward-outline'" class="text-gray-600"></ion-icon>
                </div>
                
                <div v-show="expandedSubsections.components" class="border border-gray-200 border-t-0 rounded-b p-4 bg-white">
                  <div v-for="(componentConfig, componentKey) in themeConfig.settings.components" :key="componentKey" class="mb-4 last:mb-0">
                    <div class="flex items-center justify-between p-2 bg-gray-100 border border-gray-200 rounded cursor-pointer hover:bg-gray-200 transition-colors" @click="toggleComponent(componentKey)" :class="{ 'rounded-b-none': expandedComponents[componentKey] }">
                      <div class="flex items-center">
                        <ion-icon :name="componentConfig.icon" class="mr-2 text-gray-600"></ion-icon>
                        <span class="font-medium text-gray-700">{{ componentConfig.label }}</span>
                      </div>
                      <ion-icon :name="expandedComponents[componentKey] ? 'chevron-down-outline' : 'chevron-forward-outline'" class="text-gray-600"></ion-icon>
                    </div>
                    
                    <div v-show="expandedComponents[componentKey]" class="border border-gray-200 border-t-0 rounded-b p-4 bg-white">
                      <div v-for="(fieldGroupConfig, fieldGroupKey) in componentConfig.fieldGroups" :key="fieldGroupKey" class="mb-6 last:mb-0">
                        <div class="border border-gray-100 rounded-lg p-4 bg-gray-50 shadow-sm">
                          <h4 class="text-sm font-semibold text-gray-700 mb-4 pb-2 border-b-2 border-gray-200 uppercase tracking-wide">
                            {{ fieldGroupConfig.label }}
                          </h4>
                          
                          <template v-for="(field, fieldKey) in fieldGroupConfig.fields" :key="fieldKey">
                            <!-- Campos normais -->
                            <div v-if="field.type !== 'sortable'" class="mb-4 last:mb-0">
                              <label v-if="field.type !== 'checkbox'" class="block text-sm font-medium text-gray-700 mb-2">
                                {{ field.label }}
                              </label>
                              
                              <label v-if="field.type === 'checkbox'" class="flex items-center cursor-pointer">
                                <input 
                                  type="checkbox" 
                                  v-model="field.value"
                                  class="mr-3 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <span class="text-sm font-medium text-gray-700">{{ field.label }}</span>
                              </label>
                              
                              <input 
                                v-if="field.type === 'text'" 
                                type="text" 
                                v-model="field.value"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                              
                              <textarea 
                                v-if="field.type === 'textarea'" 
                                v-model="field.value"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y min-h-20"
                              ></textarea>
                              
                              <div v-if="field.type === 'color'" class="flex items-center gap-3">
                                <input 
                                  type="color" 
                                  v-model="field.value"
                                  class="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                                />
                              </div>
                            </div>
                            
                            <!-- Campo sortable -->
                            <div v-if="field.type === 'sortable'" class="mb-4 last:mb-0">
                              <label class="block text-sm font-medium text-gray-700 mb-2">{{ field.label }}</label>
                              <div class="border border-gray-200 rounded-lg p-2 bg-white">
                                <div v-for="(item, index) in field.value" :key="index" class="flex items-center justify-between p-3 mb-2 last:mb-0 bg-gray-50 border border-gray-200 rounded transition-all hover:bg-gray-100 hover:shadow-sm">
                                  <div class="flex items-center flex-1">
                                    <ion-icon name="reorder-two-outline" class="mr-3 text-gray-500"></ion-icon>
                                    <span class="font-medium text-gray-700">{{ item.label }}</span>
                                  </div>
                                  <div class="flex gap-1">
                                    <button 
                                      type="button"
                                      @click="moveItemUp(field.value, index)"
                                      :disabled="index === 0"
                                      class="p-1 text-xs bg-white text-gray-600 border border-gray-300 rounded hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                      title="Mover para cima"
                                    >
                                      <ion-icon name="chevron-up-outline"></ion-icon>
                                    </button>
                                    <button 
                                      type="button"
                                      @click="moveItemDown(field.value, index)"
                                      :disabled="index === field.value.length - 1"
                                      class="p-1 text-xs bg-white text-gray-600 border border-gray-300 rounded hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                      title="Mover para baixo"
                                    >
                                      <ion-icon name="chevron-down-outline"></ion-icon>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </template>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
      
      <!-- Área de preview -->
      <main class="flex-1 flex flex-col overflow-hidden">
        <div class="flex justify-between items-center p-4 border-b border-gray-200 bg-white">
          <h4 class="text-lg font-semibold text-gray-800 flex items-center">
            <ion-icon name="desktop-outline" class="mr-2"></ion-icon>
            Preview do Site
          </h4>
          <div class="flex gap-2">
            <button class="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 border border-gray-300 rounded hover:bg-gray-200 transition-colors" @click="refreshPreview">
              <ion-icon name="refresh-outline" class="mr-1"></ion-icon>
              Atualizar
            </button>
            <button class="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 border border-gray-300 rounded hover:bg-gray-200 transition-colors" @click="openInNewTab">
              <ion-icon name="open-outline" class="mr-1"></ion-icon>
              Nova Aba
            </button>
          </div>
        </div>
        
        <div class="flex-1 overflow-hidden bg-gray-100 rounded-lg m-4">
          <iframe 
            ref="previewFrame"
            :src="previewUrl" 
            class="w-full h-full border-none rounded-lg bg-white"
            frameborder="0"
            title="Preview do Site"
          ></iframe>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'

export default {
  name: 'ThemeEditorTailwind',
  setup() {
    // Estados reativos
    const expandedSections = reactive({
      settings: true
    })
    
    const expandedSubsections = reactive({
      colors: true,
      fonts: true,
      components: false
    })
    
    const expandedComponents = reactive({
      productCard: false,
      newsletterPopup: false
    })
    
    const expandedFonts = reactive({
      title: false,
      subtitle: false,
      text: false
    })
    
    const previewUrl = ref('https://example.com') // URL do site a ser carregado no iframe
    
    // Configuração do tema baseada no JSON
    const themeConfig = reactive({
      settings: {
        colors: {
          primaryColor: {
            type: "color",
            label: "Cor Primária",
            value: "#007bff",
            description: "Cor principal utilizada nos elementos de destaque"
          },
          secondaryColor: {
            type: "color", 
            label: "Cor Secundária",
            value: "#6c757d",
            description: "Cor secundária para elementos de apoio"
          },
          textColor: {
            type: "color",
            label: "Cor de Texto",
            value: "#212529",
            description: "Cor padrão para textos"
          },          
          borderColor: {
            type: "color",
            label: "Cor de Borda",
            value: "#dee2e6",
            description: "Cor padrão para bordas e divisores"
          },
          successColor: {
            type: "color",
            label: "Cor de Sucesso",
            value: "#28a745",
            description: "Cor para mensagens e elementos de sucesso"
          },
          warningColor: {
            type: "color",
            label: "Cor de Aviso",
            value: "#ffc107",
            description: "Cor para mensagens e elementos de aviso"
          }
        },
        fonts: {
          title: {
            label: "Título",
            fields: {
              fontFamily: {
                label: "Família da Fonte",
                type: "select",
                value: "Arial, sans-serif",
                options: [
                  { label: "Arial", value: "Arial, sans-serif" },
                  { label: "Georgia", value: "Georgia, serif" },
                  { label: "Times New Roman", value: "Times New Roman, serif" },
                  { label: "Helvetica", value: "Helvetica, sans-serif" },
                  { label: "Roboto", value: "Roboto, sans-serif" },
                  { label: "Open Sans", value: "Open Sans, sans-serif" },
                  { label: "Lato", value: "Lato, sans-serif" },
                  { label: "Montserrat", value: "Montserrat, sans-serif" }
                ]
              },
              fontSizeDesktop: {
                label: "Tamanho Desktop",
                type: "range",
                value: 32,
                min: 16,
                max: 72,
                unit: "px"
              },
              fontSizeMobile: {
                label: "Tamanho Mobile", 
                type: "range",
                value: 24,
                min: 14,
                max: 48,
                unit: "px"
              },
              fontWeight: {
                label: "Peso da Fonte",
                type: "select",
                value: "700",
                options: [
                  { label: "Normal (400)", value: "400" },
                  { label: "Medium (500)", value: "500" },
                  { label: "Semi-bold (600)", value: "600" },
                  { label: "Bold (700)", value: "700" },
                  { label: "Extra-bold (800)", value: "800" },
                  { label: "Black (900)", value: "900" }
                ]
              }
            }
          },
          subtitle: {
            label: "Subtítulo",
            fields: {
              fontFamily: {
                label: "Família da Fonte",
                type: "select",
                value: "Arial, sans-serif",
                options: [
                  { label: "Arial", value: "Arial, sans-serif" },
                  { label: "Georgia", value: "Georgia, serif" },
                  { label: "Times New Roman", value: "Times New Roman, serif" },
                  { label: "Helvetica", value: "Helvetica, sans-serif" },
                  { label: "Roboto", value: "Roboto, sans-serif" },
                  { label: "Open Sans", value: "Open Sans, sans-serif" },
                  { label: "Lato", value: "Lato, sans-serif" },
                  { label: "Montserrat", value: "Montserrat, sans-serif" }
                ]
              },
              fontSizeDesktop: {
                label: "Tamanho Desktop",
                type: "range",
                value: 20,
                min: 12,
                max: 36,
                unit: "px"
              },
              fontSizeMobile: {
                label: "Tamanho Mobile",
                type: "range", 
                value: 16,
                min: 10,
                max: 24,
                unit: "px"
              },
              fontWeight: {
                label: "Peso da Fonte",
                type: "select",
                value: "500",
                options: [
                  { label: "Normal (400)", value: "400" },
                  { label: "Medium (500)", value: "500" },
                  { label: "Semi-bold (600)", value: "600" },
                  { label: "Bold (700)", value: "700" },
                  { label: "Extra-bold (800)", value: "800" },
                  { label: "Black (900)", value: "900" }
                ]
              }
            }
          },
          text: {
            label: "Texto",
            fields: {
              fontFamily: {
                label: "Família da Fonte",
                type: "select",
                value: "Arial, sans-serif",
                options: [
                  { label: "Arial", value: "Arial, sans-serif" },
                  { label: "Georgia", value: "Georgia, serif" },
                  { label: "Times New Roman", value: "Times New Roman, serif" },
                  { label: "Helvetica", value: "Helvetica, sans-serif" },
                  { label: "Roboto", value: "Roboto, sans-serif" },
                  { label: "Open Sans", value: "Open Sans, sans-serif" },
                  { label: "Lato", value: "Lato, sans-serif" },
                  { label: "Montserrat", value: "Montserrat, sans-serif" }
                ]
              },
              fontSizeDesktop: {
                label: "Tamanho Desktop",
                type: "range",
                value: 16,
                min: 10,
                max: 24,
                unit: "px"
              },
              fontSizeMobile: {
                label: "Tamanho Mobile",
                type: "range",
                value: 14,
                min: 10,
                max: 20,
                unit: "px"
              },
              fontWeight: {
                label: "Peso da Fonte",
                type: "select",
                value: "400",
                options: [
                  { label: "Normal (400)", value: "400" },
                  { label: "Medium (500)", value: "500" },
                  { label: "Semi-bold (600)", value: "600" },
                  { label: "Bold (700)", value: "700" },
                  { label: "Extra-bold (800)", value: "800" },
                  { label: "Black (900)", value: "900" }
                ]
              }
            }
          }
        },
        components: {
          productCard: {
            label: "Card de Produto",
            icon: "card-outline",
            fieldGroups: {
              layout: {
                label: "Layout",
                fields: {
                  cardLayout: {
                    label: "Tipo de Layout",
                    type: "select",
                    value: "vertical",
                    options: [
                      { label: "Vertical", value: "vertical" },
                      { label: "Horizontal", value: "horizontal" }
                    ]
                  }
                }
              },
              styling: {
                label: "Estilo Visual",
                fields: {
                  borderRadius: {
                    label: "Borda Arredondada",
                    type: "range",
                    value: 16,
                    min: 0,
                    max: 50,
                    unit: "px"
                  },
                  shadowIntensity: {
                    label: "Intensidade da Sombra",
                    type: "range",
                    value: 3,
                    min: 0,
                    max: 10,
                    unit: ""
                  },
                  backgroundColor: {
                    label: "Cor de Fundo",
                    type: "color",
                    value: "#ffffff"
                  }
                }
              },
              content: {
                label: "Conteúdo",
                fields: {
                  showTitle: {
                    label: "Exibir Título",
                    type: "checkbox",
                    value: true
                  },
                  showDescription: {
                    label: "Exibir Descrição",
                    type: "checkbox",
                    value: true
                  },
                  showPrice: {
                    label: "Exibir Preço",
                    type: "checkbox",
                    value: true
                  },
                  pricePosition: {
                    label: "Posição do Preço",
                    type: "select",
                    value: "bottom",
                    options: [
                      { label: "Topo", value: "top" },
                      { label: "Meio", value: "middle" },
                      { label: "Rodapé", value: "bottom" }
                    ]
                  },
                  priceOrder: {
                    label: "Ordem dos Preços",
                    type: "sortable",
                    value: [
                      { label: "Preço Original", key: "originalPrice" },
                      { label: "Preço com Desconto", key: "discountPrice" },
                      { label: "Desconto (%)", key: "discountPercent" }
                    ]
                  }
                }
              },
              behavior: {
                label: "Comportamento",
                fields: {
                  hoverEffect: {
                    label: "Efeito de Hover",
                    type: "select",
                    value: "lift",
                    options: [
                      { label: "Nenhum", value: "none" },
                      { label: "Elevação", value: "lift" },
                      { label: "Escala", value: "scale" },
                      { label: "Rotação", value: "rotate" }
                    ]
                  },
                  clickAction: {
                    label: "Ação do Clique",
                    type: "select",
                    value: "navigate",
                    options: [
                      { label: "Navegar para Produto", value: "navigate" },
                      { label: "Abrir Modal", value: "modal" },
                      { label: "Adicionar ao Carrinho", value: "cart" }
                    ]
                  }
                }
              }
            }
          },
          newsletterPopup: {
            label: "Popup de Newsletter",
            icon: "mail-outline",
            fieldGroups: {
              appearance: {
                label: "Aparência",
                fields: {
                  position: {
                    label: "Posição na Tela",
                    type: "select",
                    value: "center",
                    options: [
                      { label: "Centro", value: "center" },
                      { label: "Canto Inferior Direito", value: "bottom-right" },
                      { label: "Canto Inferior Esquerdo", value: "bottom-left" },
                      { label: "Topo", value: "top" }
                    ]
                  },
                  size: {
                    label: "Tamanho",
                    type: "select",
                    value: "medium",
                    options: [
                      { label: "Pequeno", value: "small" },
                      { label: "Médio", value: "medium" },
                      { label: "Grande", value: "large" }
                    ]
                  },
                  backgroundColor: {
                    label: "Cor de Fundo",
                    type: "color",
                    value: "#ffffff"
                  },
                  overlayOpacity: {
                    label: "Opacidade do Overlay",
                    type: "range",
                    value: 70,
                    min: 0,
                    max: 100,
                    unit: "%"
                  }
                }
              },
              content: {
                label: "Conteúdo",
                fields: {
                  title: {
                    label: "Título",
                    type: "text",
                    value: "Assine nossa Newsletter"
                  },
                  description: {
                    label: "Descrição",
                    type: "textarea",
                    value: "Receba nossas melhores ofertas e novidades diretamente no seu email!"
                  },
                  buttonText: {
                    label: "Texto do Botão",
                    type: "text",
                    value: "Assinar Agora"
                  },
                  placeholderEmail: {
                    label: "Placeholder do Email",
                    type: "text",
                    value: "Digite seu melhor email"
                  }
                }
              },
              behavior: {
                label: "Comportamento",
                fields: {
                  showDelay: {
                    label: "Atraso para Exibir (segundos)",
                    type: "range",
                    value: 5,
                    min: 0,
                    max: 30,
                    unit: "s"
                  },
                  showFrequency: {
                    label: "Frequência de Exibição",
                    type: "select",
                    value: "once",
                    options: [
                      { label: "Uma vez por sessão", value: "once" },
                      { label: "Uma vez por dia", value: "daily" },
                      { label: "Uma vez por semana", value: "weekly" },
                      { label: "Sempre", value: "always" }
                    ]
                  },
                  closeOnOverlay: {
                    label: "Fechar ao Clicar Fora",
                    type: "checkbox",
                    value: true
                  },
                  showCloseButton: {
                    label: "Exibir Botão Fechar",
                    type: "checkbox",
                    value: true
                  }
                }
              }
            }
          }
        }
      }
    })

    // Funções
    const toggleSection = (sectionKey) => {
      expandedSections[sectionKey] = !expandedSections[sectionKey]
    }

    const toggleSubsection = (subsectionKey) => {
      expandedSubsections[subsectionKey] = !expandedSubsections[subsectionKey]
    }

    const toggleComponent = (componentKey) => {
      expandedComponents[componentKey] = !expandedComponents[componentKey]
    }

    const toggleFont = (fontKey) => {
      expandedFonts[fontKey] = !expandedFonts[fontKey]
    }

    const updatePreview = () => {
      console.log('Atualizando preview...', themeConfig)
    }

    const moveItemUp = (array, index) => {
      if (index > 0) {
        [array[index], array[index - 1]] = [array[index - 1], array[index]]
      }
    }

    const moveItemDown = (array, index) => {
      if (index < array.length - 1) {
        [array[index], array[index + 1]] = [array[index + 1], array[index]]
      }
    }

    const refreshPreview = () => {
      const iframe = document.querySelector('iframe')
      if (iframe) {
        iframe.src = iframe.src
      }
    }

    const openInNewTab = () => {
      window.open(previewUrl.value, '_blank')
    }

    const exportConfig = () => {
      const dataStr = JSON.stringify(themeConfig, null, 2)
      const dataBlob = new Blob([dataStr], { type: 'application/json' })
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'theme-config.json'
      link.click()
      URL.revokeObjectURL(url)
    }

    const importConfig = () => {
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = '.json'
      input.onchange = (e) => {
        const file = e.target.files[0]
        if (file) {
          const reader = new FileReader()
          reader.onload = (e) => {
            try {
              const importedConfig = JSON.parse(e.target.result)
              Object.assign(themeConfig, importedConfig)
              updatePreview()
            } catch (error) {
              alert('Erro ao importar arquivo: ' + error.message)
            }
          }
          reader.readAsText(file)
        }
      }
      input.click()
    }

    const saveConfig = () => {
      console.log('Salvando configuração...', themeConfig)
      alert('Configuração salva com sucesso!')
    }

    return {
      expandedSections,
      expandedSubsections,
      expandedComponents,
      expandedFonts,
      previewUrl,
      themeConfig,
      toggleSection,
      toggleSubsection,
      toggleComponent,
      toggleFont,
      updatePreview,
      moveItemUp,
      moveItemDown,
      refreshPreview,
      openInNewTab,
      exportConfig,
      importConfig,
      saveConfig
    }
  }
}
</script>
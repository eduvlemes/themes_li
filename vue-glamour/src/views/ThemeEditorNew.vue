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
                        class="color-input"
                      >
                      <input 
                        type="text" 
                        v-model="colorConfig.value" 
                        @input="updatePreview"
                        class="color-text-input"
                        placeholder="#000000"
                      >
                    </div>
                    <small class="field-description">{{ colorConfig.description }}</small>
                  </div>
                </div>
              </div>
              
              <!-- Fontes -->
              <div class="subsection">
                <div class="subsection-header" @click="toggleSubsection('fonts')" :class="{ 'expanded': expandedSubsections.fonts }">
                  <ion-icon name="text-outline" class="subsection-icon"></ion-icon>
                  <span class="subsection-title">Fontes</span>
                  <ion-icon :name="expandedSubsections.fonts ? 'chevron-down-outline' : 'chevron-forward-outline'" class="toggle-icon"></ion-icon>
                </div>
                
                <div v-show="expandedSubsections.fonts" class="subsection-content">
                  <div v-for="(fontConfig, fontKey) in themeConfig.settings.fonts" :key="fontKey" class="font-section">
                    <div class="font-header" @click="toggleFontSection(fontKey)" :class="{ 'expanded': expandedFonts[fontKey] }">
                      <span class="font-title">{{ fontConfig.label }}</span>
                      <ion-icon :name="expandedFonts[fontKey] ? 'chevron-down-outline' : 'chevron-forward-outline'" class="toggle-icon"></ion-icon>
                    </div>
                    
                    <div v-show="expandedFonts[fontKey]" class="font-content">
                      <!-- Família da fonte -->
                      <div class="field-group">
                        <label class="field-label">{{ fontConfig.fontFamily.label }}</label>
                        <select v-model="fontConfig.fontFamily.value" @change="updatePreview" class="field-select">
                          <option v-for="option in fontConfig.fontFamily.options" :key="option.value" :value="option.value">
                            {{ option.label }}
                          </option>
                        </select>
                      </div>
                      
                      <!-- Tamanho da fonte Desktop -->
                      <div class="field-group">
                        <label class="field-label">{{ fontConfig.fontSize.desktop.label }}</label>
                        <div class="range-input">
                          <input 
                            type="range" 
                            v-model="fontConfig.fontSize.desktop.value" 
                            :min="fontConfig.fontSize.desktop.min"
                            :max="fontConfig.fontSize.desktop.max"
                            :step="fontConfig.fontSize.desktop.step"
                            @input="updatePreview"
                            class="field-range"
                          >
                          <span class="range-value">{{ fontConfig.fontSize.desktop.value }}{{ fontConfig.fontSize.desktop.unit }}</span>
                        </div>
                      </div>
                      
                      <!-- Tamanho da fonte Mobile -->
                      <div class="field-group">
                        <label class="field-label">{{ fontConfig.fontSize.mobile.label }}</label>
                        <div class="range-input">
                          <input 
                            type="range" 
                            v-model="fontConfig.fontSize.mobile.value" 
                            :min="fontConfig.fontSize.mobile.min"
                            :max="fontConfig.fontSize.mobile.max"
                            :step="fontConfig.fontSize.mobile.step"
                            @input="updatePreview"
                            class="field-range"
                          >
                          <span class="range-value">{{ fontConfig.fontSize.mobile.value }}{{ fontConfig.fontSize.mobile.unit }}</span>
                        </div>
                      </div>
                      
                      <!-- Espaçamento da fonte -->
                      <div class="field-group">
                        <label class="field-label">{{ fontConfig.letterSpacing.label }}</label>
                        <div class="range-input">
                          <input 
                            type="range" 
                            v-model="fontConfig.letterSpacing.value" 
                            :min="fontConfig.letterSpacing.min"
                            :max="fontConfig.letterSpacing.max"
                            :step="fontConfig.letterSpacing.step"
                            @input="updatePreview"
                            class="field-range"
                          >
                          <span class="range-value">{{ fontConfig.letterSpacing.value }}{{ fontConfig.letterSpacing.unit }}</span>
                        </div>
                      </div>
                      
                      <!-- Font Weight -->
                      <div class="field-group">
                        <label class="field-label">{{ fontConfig.fontWeight.label }}</label>
                        <select v-model="fontConfig.fontWeight.value" @change="updatePreview" class="field-select">
                          <option v-for="option in fontConfig.fontWeight.options" :key="option.value" :value="option.value">
                            {{ option.label }}
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Componentes -->
              <div class="subsection">
                <div class="subsection-header" @click="toggleSubsection('components')" :class="{ 'expanded': expandedSubsections.components }">
                  <ion-icon name="apps-outline" class="subsection-icon"></ion-icon>
                  <span class="subsection-title">Componentes</span>
                  <ion-icon :name="expandedSubsections.components ? 'chevron-down-outline' : 'chevron-forward-outline'" class="toggle-icon"></ion-icon>
                </div>
                
                <div v-show="expandedSubsections.components" class="subsection-content">
                  <div v-for="(componentConfig, componentKey) in themeConfig.settings.components" :key="componentKey" class="component-section">
                    <div class="component-header" @click="toggleComponentSection(componentKey)" :class="{ 'expanded': expandedComponents[componentKey] }">
                      <span class="component-title">{{ componentConfig.label }}</span>
                      <ion-icon :name="expandedComponents[componentKey] ? 'chevron-down-outline' : 'chevron-forward-outline'" class="toggle-icon"></ion-icon>
                    </div>
                    
                    <div v-show="expandedComponents[componentKey]" class="component-content">
                      <!-- Renderização dinâmica dos campos do componente -->
                      <div v-for="(fieldGroup, groupKey) in componentConfig" :key="groupKey" class="field-group-container">
                        <div v-if="groupKey !== 'label'" class="field-group-section">
                          <h6 class="field-group-title">{{ fieldGroup.label || groupKey }}</h6>
                          
                          <!-- Renderização recursiva dos campos -->
                          <template v-for="(field, fieldKey) in fieldGroup" :key="fieldKey">
                            <!-- Se é um campo direto (tem type) -->
                            <div v-if="fieldKey !== 'label' && field.type" class="field-group">
                              
                              <!-- Campo de Cor -->
                              <div v-if="field.type === 'color'">
                                <label class="field-label">{{ field.label }}</label>
                                <div class="field-input color-field">
                                  <input 
                                    type="color" 
                                    v-model="field.value" 
                                    @input="updatePreview"
                                    class="color-input"
                                  >
                                  <input 
                                    type="text" 
                                    v-model="field.value" 
                                    @input="updatePreview"
                                    class="color-text-input"
                                    :placeholder="field.value"
                                  >
                                </div>
                              </div>
                              
                              <!-- Campo de Texto -->
                              <div v-else-if="field.type === 'text'">
                                <label class="field-label">{{ field.label }}</label>
                                <div class="field-input">
                                  <input 
                                    type="text" 
                                    v-model="field.value" 
                                    @input="updatePreview"
                                    class="field-text-input"
                                    :placeholder="field.label"
                                  >
                                </div>
                              </div>
                              
                              <!-- Campo de Textarea -->
                              <div v-else-if="field.type === 'textarea'">
                                <label class="field-label">{{ field.label }}</label>
                                <div class="field-input">
                                  <textarea 
                                    v-model="field.value" 
                                    @input="updatePreview"
                                    class="field-textarea"
                                    :placeholder="field.label"
                                    rows="3"
                                  ></textarea>
                                </div>
                              </div>
                              
                              <!-- Campo de Select -->
                              <div v-else-if="field.type === 'select'">
                                <label class="field-label">{{ field.label }}</label>
                                <div class="field-input">
                                  <select v-model="field.value" @change="updatePreview" class="field-select">
                                    <option v-for="option in field.options" :key="option.value" :value="option.value">
                                      {{ option.label }}
                                    </option>
                                  </select>
                                </div>
                              </div>
                              
                              <!-- Campo de Range -->
                              <div v-else-if="field.type === 'range'">
                                <label class="field-label">{{ field.label }}</label>
                                <div class="field-input">
                                  <div class="range-input">
                                    <input 
                                      type="range" 
                                      v-model="field.value" 
                                      :min="field.min"
                                      :max="field.max"
                                      :step="field.step"
                                      @input="updatePreview"
                                      class="field-range"
                                    >
                                    <span class="range-value">{{ field.value }}{{ field.unit }}</span>
                                  </div>
                                </div>
                              </div>
                              
                              <!-- Campo de Toggle -->
                              <div v-else-if="field.type === 'toggle'">
                                <div class="field-input">
                                  <label class="field-label checkbox-label">
                                    <input 
                                      type="checkbox" 
                                      v-model="field.value" 
                                      @change="updatePreview"
                                      class="field-checkbox"
                                    >
                                    {{ field.label }}
                                  </label>
                                </div>
                              </div>
                              
                              <!-- Campo Sortable (para ordem dos preços) -->
                              <div v-else-if="field.type === 'sortable'">
                                <label class="field-label">{{ field.label }}</label>
                                <div class="field-input">
                                  <div class="sortable-container">
                                    <div class="sortable-list">
                                      <div 
                                        v-for="(item, index) in field.value" 
                                        :key="item" 
                                        class="sortable-item"
                                      >
                                        <div class="sortable-content">
                                          <ion-icon name="menu-outline" class="drag-handle"></ion-icon>
                                          <span class="item-label">{{ field.options.find(opt => opt.value === item)?.label || item }}</span>
                                        </div>
                                        <div class="sortable-controls">
                                          <button 
                                            type="button"
                                            @click="moveItemUp(field.value, index)"
                                            :disabled="index === 0"
                                            class="btn btn-sm btn-outline-secondary"
                                            title="Mover para cima"
                                          >
                                            <ion-icon name="chevron-up-outline"></ion-icon>
                                          </button>
                                          <button 
                                            type="button"
                                            @click="moveItemDown(field.value, index)"
                                            :disabled="index === field.value.length - 1"
                                            class="btn btn-sm btn-outline-secondary"
                                            title="Mover para baixo"
                                          >
                                            <ion-icon name="chevron-down-outline"></ion-icon>
                                          </button>
                                        </div>
                                      </div>
                                    </div>
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
      <main class="editor-preview">
        <div class="preview-header">
          <h4>
            <ion-icon name="desktop-outline"></ion-icon>
            Preview do Site
          </h4>
          <div class="preview-controls">
            <button class="btn btn-sm btn-outline-secondary" @click="refreshPreview">
              <ion-icon name="refresh-outline"></ion-icon>
              Atualizar
            </button>
            <button class="btn btn-sm btn-outline-secondary" @click="openInNewTab">
              <ion-icon name="open-outline"></ion-icon>
              Nova Aba
            </button>
          </div>
        </div>
        
        <div class="preview-content">
          <iframe 
            ref="previewFrame"
            :src="previewUrl" 
            class="preview-iframe"
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
  name: 'ThemeEditorNew',
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
            fontSize: {
              desktop: {
                label: "Tamanho Desktop",
                type: "range",
                value: 32,
                min: 16,
                max: 72,
                step: 2,
                unit: "px"
              },
              mobile: {
                label: "Tamanho Mobile", 
                type: "range",
                value: 24,
                min: 14,
                max: 48,
                step: 2,
                unit: "px"
              }
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
            },
            fontStyle: {
              label: "Estilo da Fonte",
              type: "select",
              value: "Normal",
              options: [
                { label: "Normal", value: "normal" },
                { label: "Italic", value: "italic" },
                
              ]
            },
            letterSpacing: {
              label: "Espaçamento entre Letras",
              type: "range",
              value: 0,
              min: -2,
              max: 5,
              step: 0.1,
              unit: "px"
            }
          },
          subtitle: {
            label: "Subtítulo",
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
            fontSize: {
              desktop: {
                label: "Tamanho Desktop",
                type: "range",
                value: 20,
                min: 12,
                max: 36,
                step: 1,
                unit: "px"
              },
              mobile: {
                label: "Tamanho Mobile",
                type: "range", 
                value: 16,
                min: 10,
                max: 24,
                step: 1,
                unit: "px"
              }
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
            },
            letterSpacing: {
              label: "Espaçamento entre Letras",
              type: "range",
              value: 0,
              min: -1,
              max: 3,
              step: 0.1,
              unit: "px"
            }
          },
          text: {
            label: "Texto",
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
            fontSize: {
              desktop: {
                label: "Tamanho Desktop",
                type: "range",
                value: 16,
                min: 10,
                max: 24,
                step: 1,
                unit: "px"
              },
              mobile: {
                label: "Tamanho Mobile",
                type: "range",
                value: 14,
                min: 10,
                max: 20,
                step: 1,
                unit: "px"
              }
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
            },
            letterSpacing: {
              label: "Espaçamento entre Letras",
              type: "range",
              value: 0,
              min: -1,
              max: 2,
              step: 0.1,
              unit: "px"
            }
          }
        },
        components: {
          productCard: {
            label: "Card de Produto",
            layout: {
              label: "Layout",
              type: "select",
              value: "vertical",
              options: [
                { label: "Vertical", value: "vertical" },
                { label: "Horizontal", value: "horizontal" }
              ]
            },
            card: {
              label: "Configurações do Card",
              borderRadius: {
                label: "Borda Arredondada",
                type: "range",
                value: 16,
                min: 0,
                max: 50,
                step: 1,
                unit: "px"
              },
              shadow: {
                label: "Sombra",
                type: "text",
                value: "0 2px 12px rgba(0,0,0,0.08)"
              },
              background: {
                label: "Cor de Fundo",
                type: "color",
                value: "#ffffff"
              },
              hoverShadow: {
                label: "Sombra no Hover",
                type: "text",
                value: "0 6px 16px rgba(0,0,0,0.12)"
              },
              padding: {
                label: "Espaçamento Interno",
                type: "range",
                value: 16,
                min: 0,
                max: 50,
                step: 1,
                unit: "px"
              },
              spacing: {
                label: "Espaçamento entre Elementos",
                type: "range",
                value: 12,
                min: 0,
                max: 30,
                step: 1,
                unit: "px"
              }
            },
            image: {
              label: "Configurações da Imagem",
              ratio: {
                label: "Proporção da Imagem",
                type: "select",
                value: "1:1",
                options: [
                  { label: "1:1 (Quadrada)", value: "1:1" },
                  { label: "4:3 (Landscape)", value: "4:3" },
                  { label: "3:4 (Portrait)", value: "3:4" },
                  { label: "16:9 (Widescreen)", value: "16:9" }
                ]
              },
              borderRadius: {
                label: "Borda Arredondada da Imagem",
                type: "range",
                value: 12,
                min: 0,
                max: 50,
                step: 1,
                unit: "px"
              },
              hoverEffect: {
                label: "Efeito no Hover",
                type: "select",
                value: "zoom",
                options: [
                  { label: "Zoom", value: "zoom" },
                  { label: "Fade", value: "fade" },
                  { label: "Nenhum", value: "none" }
                ]
              },
              objectFit: {
                label: "Ajuste da Imagem",
                type: "select",
                value: "cover",
                options: [
                  { label: "Cover", value: "cover" },
                  { label: "Contain", value: "contain" },
                  { label: "Fill", value: "fill" }
                ]
              },
              backgroundColor: {
                label: "Cor de Fundo da Imagem",
                type: "color",
                value: "#f8f8f8"
              }
            },
            title: {
              label: "Configurações do Título",
              fontFamily: {
                label: "Família da Fonte",
                type: "select",
                value: "Oswald, sans-serif",
                options: [
                  { label: "Oswald", value: "Oswald, sans-serif" },
                  { label: "Roboto", value: "Roboto, sans-serif" },
                  { label: "Inter", value: "Inter, sans-serif" },
                  { label: "Poppins", value: "Poppins, sans-serif" },
                  { label: "Arial", value: "Arial, sans-serif" }
                ]
              },
              fontSize: {
                label: "Tamanho da Fonte",
                type: "range",
                value: 16,
                min: 12,
                max: 24,
                step: 1,
                unit: "px"
              },
              fontWeight: {
                label: "Peso da Fonte",
                type: "select",
                value: "600",
                options: [
                  { label: "Normal (400)", value: "400" },
                  { label: "Medium (500)", value: "500" },
                  { label: "Semi-bold (600)", value: "600" },
                  { label: "Bold (700)", value: "700" }
                ]
              },
              color: {
                label: "Cor do Título",
                type: "color",
                value: "#222222"
              },
              textAlign: {
                label: "Alinhamento do Texto",
                type: "select",
                value: "left",
                options: [
                  { label: "Esquerda", value: "left" },
                  { label: "Centro", value: "center" },
                  { label: "Direita", value: "right" }
                ]
              },
              maxLines: {
                label: "Máximo de Linhas",
                type: "range",
                value: 2,
                min: 1,
                max: 5,
                step: 1,
                unit: ""
              }
            },
            price: {
              label: "Configurações do Preço",
              fontFamily: {
                label: "Família da Fonte",
                type: "select",
                value: "Inter, sans-serif",
                options: [
                  { label: "Inter", value: "Inter, sans-serif" },
                  { label: "Roboto", value: "Roboto, sans-serif" },
                  { label: "Oswald", value: "Oswald, sans-serif" },
                  { label: "Poppins", value: "Poppins, sans-serif" },
                  { label: "Arial", value: "Arial, sans-serif" }
                ]
              },
              currentColor: {
                label: "Cor do Preço Atual",
                type: "color",
                value: "#111111"
              },
              originalColor: {
                label: "Cor do Preço Original",
                type: "color",
                value: "#999999"
              },
              fontWeight: {
                label: "Peso da Fonte",
                type: "select",
                value: "700",
                options: [
                  { label: "Normal (400)", value: "400" },
                  { label: "Medium (500)", value: "500" },
                  { label: "Semi-bold (600)", value: "600" },
                  { label: "Bold (700)", value: "700" }
                ]
              },
              fontSize: {
                label: "Tamanho da Fonte",
                type: "range",
                value: 15,
                min: 12,
                max: 20,
                step: 1,
                unit: "px"
              },
              showDiscountTag: {
                label: "Mostrar Tag de Desconto",
                type: "toggle",
                value: true
              },
              showPix: {
                label: "Exibir Preço PIX",
                type: "toggle",
                value: true
              },
              showBoleto: {
                label: "Exibir Preço Boleto",
                type: "toggle",
                value: true
              },
              showCard: {
                label: "Exibir Preço Cartão",
                type: "toggle",
                value: true
              },
              priceOrder: {
                label: "Ordem dos Preços",
                type: "sortable",
                value: ["pix", "boleto", "base", "card"],
                options: [
                  { label: "PIX", value: "pix" },
                  { label: "Boleto", value: "boleto" },
                  { label: "Valor Base", value: "base" },
                  { label: "Cartão", value: "card" }
                ]
              }
            },
            badges: {
              label: "Configurações dos Badges",
              position: {
                label: "Posição",
                type: "select",
                value: "top-left",
                options: [
                  { label: "Superior Esquerda", value: "top-left" },
                  { label: "Superior Direita", value: "top-right" },
                  { label: "Inferior Esquerda", value: "bottom-left" },
                  { label: "Inferior Direita", value: "bottom-right" }
                ]
              },
              style: {
                label: "Estilo",
                type: "select",
                value: "rounded",
                options: [
                  { label: "Arredondado", value: "rounded" },
                  { label: "Quadrado", value: "square" },
                  { label: "Circular", value: "circle" }
                ]
              },
              fontSize: {
                label: "Tamanho da Fonte",
                type: "range",
                value: 12,
                min: 10,
                max: 16,
                step: 1,
                unit: "px"
              },
              padding: {
                label: "Espaçamento Interno",
                type: "text",
                value: "4px 8px"
              }
            },
            buttons: {
              label: "Configurações dos Botões",
              addToCart: {
                label: "Botão Adicionar ao Carrinho",
                style: {
                  label: "Estilo",
                  type: "select",
                  value: "filled",
                  options: [
                    { label: "Preenchido", value: "filled" },
                    { label: "Outline", value: "outline" },
                    { label: "Ghost", value: "ghost" }
                  ]
                },
                backgroundColor: {
                  label: "Cor de Fundo",
                  type: "color",
                  value: "#000000"
                },
                textColor: {
                  label: "Cor do Texto",
                  type: "color",
                  value: "#ffffff"
                },
                borderRadius: {
                  label: "Borda Arredondada",
                  type: "range",
                  value: 8,
                  min: 0,
                  max: 25,
                  step: 1,
                  unit: "px"
                },
                fontWeight: {
                  label: "Peso da Fonte",
                  type: "select",
                  value: "600",
                  options: [
                    { label: "Normal (400)", value: "400" },
                    { label: "Medium (500)", value: "500" },
                    { label: "Semi-bold (600)", value: "600" },
                    { label: "Bold (700)", value: "700" }
                  ]
                },
                hoverBackgroundColor: {
                  label: "Cor de Fundo no Hover",
                  type: "color",
                  value: "#333333"
                }
              },
              wishlist: {
                label: "Botão Favoritos",
                iconOnly: {
                  label: "Apenas Ícone",
                  type: "toggle",
                  value: true
                },
                iconColor: {
                  label: "Cor do Ícone",
                  type: "color",
                  value: "#e74c3c"
                },
                hoverIconColor: {
                  label: "Cor do Ícone no Hover",
                  type: "color",
                  value: "#c0392b"
                }
              }
            }
          },
          newsletterPopup: {
            label: "Popup de Newsletter",
            image: {
              label: "Imagem",
              url: {
                label: "URL da Imagem",
                type: "text",
                value: ""
              },
              alt: {
                label: "Texto Alternativo",
                type: "text",
                value: "Newsletter"
              }
            },
            title: {
              label: "Título",
              text: {
                label: "Texto do Título",
                type: "text",
                value: "Receba nossas novidades!"
              },
              fontSize: {
                label: "Tamanho da Fonte",
                type: "range",
                value: 24,
                min: 16,
                max: 36,
                step: 1,
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
                  { label: "Bold (700)", value: "700" }
                ]
              },
              color: {
                label: "Cor do Título",
                type: "color",
                value: "#333333"
              }
            },
            description: {
              label: "Descrição",
              text: {
                label: "Texto da Descrição",
                type: "textarea",
                value: "Cadastre-se e receba ofertas exclusivas e novidades em primeira mão!"
              },
              fontSize: {
                label: "Tamanho da Fonte",
                type: "range",
                value: 14,
                min: 12,
                max: 18,
                step: 1,
                unit: "px"
              },
              color: {
                label: "Cor da Descrição",
                type: "color",
                value: "#666666"
              }
            },
            discount: {
              label: "Cupom de Desconto",
              text: {
                label: "Texto do Cupom",
                type: "text",
                value: "GANHE10"
              },
              percentage: {
                label: "Porcentagem de Desconto",
                type: "range",
                value: 10,
                min: 5,
                max: 50,
                step: 5,
                unit: "%"
              },
              backgroundColor: {
                label: "Cor de Fundo do Cupom",
                type: "color",
                value: "#f39c12"
              },
              textColor: {
                label: "Cor do Texto do Cupom",
                type: "color",
                value: "#ffffff"
              }
            },
            successMessage: {
              label: "Mensagem de Sucesso",
              text: {
                label: "Texto de Agradecimento",
                type: "textarea",
                value: "Obrigado! Você receberá nossas novidades em breve."
              },
              color: {
                label: "Cor da Mensagem",
                type: "color",
                value: "#27ae60"
              }
            },
            errorMessage: {
              label: "Mensagem de Erro",
              text: {
                label: "Texto de Erro",
                type: "text",
                value: "Ops! Algo deu errado. Tente novamente."
              },
              color: {
                label: "Cor da Mensagem",
                type: "color",
                value: "#e74c3c"
              }
            },
            background: {
              label: "Fundo do Popup",
              backgroundColor: {
                label: "Cor de Fundo",
                type: "color",
                value: "#ffffff"
              },
              borderRadius: {
                label: "Borda Arredondada",
                type: "range",
                value: 16,
                min: 0,
                max: 30,
                step: 1,
                unit: "px"
              },
              shadow: {
                label: "Sombra",
                type: "text",
                value: "0 10px 40px rgba(0,0,0,0.15)"
              }
            },
            button: {
              label: "Botão de Cadastro",
              text: {
                label: "Texto do Botão",
                type: "text",
                value: "Cadastrar"
              },
              backgroundColor: {
                label: "Cor de Fundo",
                type: "color",
                value: "#3498db"
              },
              textColor: {
                label: "Cor do Texto",
                type: "color",
                value: "#ffffff"
              },
              hoverBackgroundColor: {
                label: "Cor de Fundo no Hover",
                type: "color",
                value: "#2980b9"
              },
              borderRadius: {
                label: "Borda Arredondada",
                type: "range",
                value: 8,
                min: 0,
                max: 25,
                step: 1,
                unit: "px"
              }
            },
            overlay: {
              label: "Sobreposição",
              backgroundColor: {
                label: "Cor de Fundo da Sobreposição",
                type: "color",
                value: "rgba(0,0,0,0.5)"
              }
            }
          }
        }
      }
    })
    
    // Métodos
    const toggleSection = (sectionName) => {
      expandedSections[sectionName] = !expandedSections[sectionName]
    }
    
    const toggleSubsection = (subsectionName) => {
      expandedSubsections[subsectionName] = !expandedSubsections[subsectionName]
    }
    
    const toggleFontSection = (fontKey) => {
      expandedFonts[fontKey] = !expandedFonts[fontKey]
    }
    
    const toggleComponentSection = (componentKey) => {
      expandedComponents[componentKey] = !expandedComponents[componentKey]
    }
    
    const moveItemUp = (array, index) => {
      if (index > 0) {
        const temp = array[index]
        array[index] = array[index - 1]
        array[index - 1] = temp
        updatePreview()
      }
    }
    
    const moveItemDown = (array, index) => {
      if (index < array.length - 1) {
        const temp = array[index]
        array[index] = array[index + 1]
        array[index + 1] = temp
        updatePreview()
      }
    }
    
    const updatePreview = () => {
      // Aqui você pode implementar a lógica para enviar as configurações para o site
      console.log('Configurações atualizadas:', themeConfig)
    }
    
    const refreshPreview = () => {
      // Força o reload do iframe
      const iframe = document.querySelector('.preview-iframe')
      if (iframe) {
        const currentSrc = iframe.src
        iframe.src = ''
        iframe.src = currentSrc
      }
    }
    
    const openInNewTab = () => {
      window.open(previewUrl.value, '_blank')
    }
    
    const exportConfig = () => {
      const configToExport = JSON.stringify(themeConfig, null, 2)
      const blob = new Blob([configToExport], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'theme-config.json'
      a.click()
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
              alert('Configuração importada com sucesso!')
            } catch (error) {
              alert('Erro ao importar configuração: ' + error.message)
            }
          }
          reader.readAsText(file)
        }
      }
      input.click()
    }
    
    const saveConfig = () => {
      // Aqui você implementaria a lógica para salvar no backend
      console.log('Salvando configuração:', themeConfig)
      alert('Configuração salva com sucesso!')
    }
    
    return {
      expandedSections,
      expandedSubsections,
      expandedFonts,
      expandedComponents,
      previewUrl,
      themeConfig,
      toggleSection,
      toggleSubsection,
      toggleFontSection,
      toggleComponentSection,
      moveItemUp,
      moveItemDown,
      updatePreview,
      refreshPreview,
      openInNewTab,
      exportConfig,
      importConfig,
      saveConfig
    }
  }
}
</script>

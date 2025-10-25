<template>
  <div class="theme-editor">
    <!-- Header do Editor -->
    <div class="editor-header">
      <div class="container-fluid">
        <div class="d-flex justify-content-between align-items-center py-3">
          <div>
            <h1 class="h4 mb-0">{{ theme.themeName || 'Theme Editor' }}</h1>
            <small class="text-muted">por {{ theme.themeAuthor || 'Autor' }}</small>
          </div>
          <div>
            <button class="btn btn-outline-secondary btn-sm me-2" @click="importTheme">
              📤 Importar
            </button>
            <button class="btn btn-outline-secondary btn-sm me-2" @click="exportTheme">
              📥 Exportar
            </button>
            <button class="btn btn-success btn-sm" @click="saveTheme">
              💾 Salvar
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="editor-body d-flex">
      <!-- Sidebar de Navegação -->
      <aside class="editor-sidebar">
        <!-- Configurações Gerais -->
        <div class="sidebar-section">
          <h3 class="sidebar-title" @click="toggleSection('settings')">
            <span class="toggle-icon">{{ collapsedSections.settings ? '▶' : '▼' }}</span>
            ⚙️ Configurações
          </h3>
          <ul class="sidebar-list" v-show="!collapsedSections.settings">
            <li class="sidebar-item" 
                v-for="(section, key) in theme.settings" 
                :key="'settings-' + key"
                @click="openEditor('settings', key)"
                :class="{ active: activeSection === 'settings' && activeKey === key }">
              <span class="item-icon">🎨</span>
              {{ getDisplayName(key) }}
            </li>
          </ul>
        </div>

        <!-- Páginas -->
        <div class="sidebar-section">
          <h3 class="sidebar-title" @click="toggleSection('pages')">
            <span class="toggle-icon">{{ collapsedSections.pages ? '▶' : '▼' }}</span>
            📄 Páginas
          </h3>
          <ul class="sidebar-list" v-show="!collapsedSections.pages">
            <li class="sidebar-item" 
                v-for="(page, key) in theme.pages" 
                :key="'page-' + key"
                @click="openEditor('pages', key)"
                :class="{ active: activeSection === 'pages' && activeKey === key }">
              <span class="item-icon">📄</span>
              {{ getDisplayName(key) }}
            </li>
          </ul>
        </div>

        <!-- Blocos -->
        <div class="sidebar-section">
          <h3 class="sidebar-title" @click="toggleSection('blocks')">
            <span class="toggle-icon">{{ collapsedSections.blocks ? '▶' : '▼' }}</span>
            🧱 Blocos
          </h3>
          <ul class="sidebar-list" v-show="!collapsedSections.blocks">
            <li class="sidebar-item" 
                v-for="(block, key) in theme.blocks" 
                :key="'block-' + key"
                @click="openEditor('blocks', key)"
                :class="{ active: activeSection === 'blocks' && activeKey === key }">
              <span class="item-icon">🧱</span>
              {{ getDisplayName(key) }}
            </li>
          </ul>
        </div>

        <!-- Componentes -->
        <div class="sidebar-section">
          <h3 class="sidebar-title" @click="toggleSection('components')">
            <span class="toggle-icon">{{ collapsedSections.components ? '▶' : '▼' }}</span>
            🔧 Componentes
          </h3>
          <ul class="sidebar-list" v-show="!collapsedSections.components">
            <li class="sidebar-item" 
                v-for="(component, key) in theme.components" 
                :key="'component-' + key"
                @click="openEditor('components', key)"
                :class="{ active: activeSection === 'components' && activeKey === key }">
              <span class="item-icon">🔧</span>
              {{ getDisplayName(key) }}
            </li>
          </ul>
        </div>

        <!-- Elementos -->
        <div class="sidebar-section">
          <h3 class="sidebar-title" @click="toggleSection('elements')">
            <span class="toggle-icon">{{ collapsedSections.elements ? '▶' : '▼' }}</span>
            ⚛️ Elementos
          </h3>
          <ul class="sidebar-list" v-show="!collapsedSections.elements">
            <li class="sidebar-item" 
                v-for="(element, key) in theme.elements" 
                :key="'element-' + key"
                @click="openEditor('elements', key)"
                :class="{ active: activeSection === 'elements' && activeKey === key }">
              <span class="item-icon">⚛️</span>
              {{ getDisplayName(key) }}
            </li>
          </ul>
        </div>
      </aside>

      <!-- Área Principal de Edição -->
      <main class="editor-main">
        <!-- Editor de Propriedades -->
        <div class="editor-panel" v-if="activeSection && activeKey">
          <div class="panel-header">
            <h2 class="panel-title">
              {{ getDisplayName(activeKey) }}
              <small class="text-muted">{{ activeSection }}</small>
            </h2>
          </div>

          <div class="panel-body">
            <!-- Renderização recursiva do editor -->
            <property-editor
              :data="currentData"
              :path="[activeSection, activeKey]"
              @update="updateProperty"
            />
          </div>
        </div>

        <!-- Estado vazio -->
        <div class="empty-state" v-else>
          <div class="text-center">
            <div class="empty-icon">🎨</div>
            <h3>Selecione um item para editar</h3>
            <p class="text-muted">
              Escolha uma configuração, página, bloco, componente ou elemento no menu lateral para começar a editar.
            </p>
          </div>
        </div>
      </main>

      <!-- Preview -->
      <div class="editor-preview" v-if="showPreview">
        <div class="preview-header">
          <h3 class="preview-title">Preview</h3>
          <button class="btn btn-sm btn-outline-secondary" @click="togglePreview">
            {{ showPreview ? '👁️' : '👁️‍🗨️' }}
          </button>
        </div>
        <div class="preview-content">
          <pre>{{ JSON.stringify(currentData, null, 2) }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Sortable } from '@shopify/draggable';
import themeData from './theme-complete.json';

// Componente para edição recursiva de propriedades
const PropertyEditor = {
  name: 'PropertyEditor',
  props: {
    data: Object,
    path: Array
  },
  emits: ['update'],
  template: `
    <div class="property-editor">
      <div v-for="(value, key) in data" :key="key" class="property-group">
        <!-- Array (Lista Draggável) -->
        <div v-if="Array.isArray(value)" class="array-property">
          <label class="property-label">
            {{ getDisplayName(key) }}
            <button class="btn btn-sm btn-primary ms-2" @click="addArrayItem(key)">
              + Adicionar
            </button>
          </label>
          <div class="array-list" 
               :class="{ 'sortable-list': key === 'items' || key === 'blocks' }"
               :ref="'sortable-' + key">
            <div v-for="(item, index) in value" 
                 :key="index" 
                 class="array-item"
                 :class="{ 'sortable-item': key === 'items' || key === 'blocks' }">
              <div class="array-item-header" v-if="key === 'items' || key === 'blocks'">
                <span class="drag-handle">⋮⋮</span>
                <span class="item-title">{{ getDisplayName(key) }} {{ index + 1 }}</span>
                <button class="btn btn-sm btn-danger" @click="removeArrayItem(key, index)">
                  ×
                </button>
              </div>
              <div class="array-item-content">
                <property-editor
                  :data="item"
                  :path="[...path, key, index]"
                  @update="$emit('update', $event)"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Objeto (Grupo de Propriedades) -->
        <div v-else-if="typeof value === 'object' && value !== null" class="object-property">
          <label class="property-label collapsible" @click="toggleGroup(key)">
            <span class="toggle-icon">{{ collapsedGroups[key] ? '▶' : '▼' }}</span>
            {{ getDisplayName(key) }}
          </label>
          <div class="object-content" v-show="!collapsedGroups[key]">
            <property-editor
              :data="value"
              :path="[...path, key]"
              @update="$emit('update', $event)"
            />
          </div>
        </div>

        <!-- Primitivos (String, Number, Boolean) -->
        <div v-else class="primitive-property">
          <label class="property-label" :for="getFieldId(key)">
            {{ getDisplayName(key) }}
          </label>
          
          <!-- Boolean -->
          <div v-if="typeof value === 'boolean'" class="form-check">
            <input 
              type="checkbox" 
              class="form-check-input" 
              :id="getFieldId(key)"
              :checked="value"
              @change="updateValue(key, $event.target.checked)"
            />
          </div>

          <!-- Number -->
          <input v-else-if="typeof value === 'number'" 
                 type="number" 
                 class="form-control"
                 :id="getFieldId(key)"
                 :value="value"
                 @input="updateValue(key, Number($event.target.value))"
          />

          <!-- String - URL -->
          <input v-else-if="key.includes('url') || key.includes('src') || key.includes('href')" 
                 type="url" 
                 class="form-control"
                 :id="getFieldId(key)"
                 :value="value"
                 @input="updateValue(key, $event.target.value)"
          />

          <!-- String - Color -->
          <div v-else-if="key.includes('color') || key.includes('Color')" class="color-input">
            <input type="color" 
                   class="form-control form-control-color"
                   :id="getFieldId(key)"
                   :value="value"
                   @input="updateValue(key, $event.target.value)"
            />
            <input type="text" 
                   class="form-control ms-2"
                   :value="value"
                   @input="updateValue(key, $event.target.value)"
            />
          </div>

          <!-- String - Textarea para textos longos -->
          <textarea v-else-if="key.includes('description') || key.includes('content') || value.length > 50" 
                    class="form-control"
                    :id="getFieldId(key)"
                    :value="value"
                    @input="updateValue(key, $event.target.value)"
                    rows="3"
          ></textarea>

          <!-- String - Text padrão -->
          <input v-else 
                 type="text" 
                 class="form-control"
                 :id="getFieldId(key)"
                 :value="value"
                 @input="updateValue(key, $event.target.value)"
          />
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      collapsedGroups: {}
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initializeSortables();
    });
  },
  methods: {
    getDisplayName(key) {
      const displayNames = {
        // Settings
        colors: '🎨 Cores',
        typography: '📝 Tipografia',
        spacing: '📏 Espaçamento',
        breakpoints: '📱 Breakpoints',
        
        // Pages
        home: '🏠 Início',
        product: '📦 Produto',
        category: '📂 Categoria',
        brand: '🏷️ Marca',
        search: '🔍 Busca',
        
        // Common
        seo: '🔍 SEO',
        layout: '📐 Layout',
        blocks: '🧱 Blocos',
        items: '📋 Itens',
        settings: '⚙️ Configurações',
        content: '📄 Conteúdo',
        style: '🎨 Estilo',
        desktop: '💻 Desktop',
        mobile: '📱 Mobile',
        image: '🖼️ Imagem',
        video: '🎥 Vídeo',
        button: '🔘 Botão',
        title: '📋 Título',
        text: '📝 Texto',
        color: '🎨 Cor',
        size: '📏 Tamanho',
        fontSize: '📏 Tamanho da Fonte',
        fontWeight: '📝 Peso da Fonte',
        background: '🎨 Fundo',
        border: '🔲 Borda',
        margin: '📏 Margem',
        padding: '📏 Padding'
      };
      
      return displayNames[key] || key.charAt(0).toUpperCase() + key.slice(1);
    },
    
    getFieldId(key) {
      return this.path.join('-') + '-' + key;
    },
    
    updateValue(key, value) {
      this.$emit('update', {
        path: [...this.path, key],
        value
      });
    },
    
    toggleGroup(key) {
      this.$set(this.collapsedGroups, key, !this.collapsedGroups[key]);
    },
    
    addArrayItem(key) {
      const newItem = this.getDefaultArrayItem(key);
      this.$emit('update', {
        path: [...this.path, key],
        value: [...this.data[key], newItem],
        type: 'array-add'
      });
    },
    
    removeArrayItem(key, index) {
      if (confirm('Tem certeza que deseja remover este item?')) {
        const newArray = [...this.data[key]];
        newArray.splice(index, 1);
        this.$emit('update', {
          path: [...this.path, key],
          value: newArray,
          type: 'array-remove'
        });
      }
    },
    
    getDefaultArrayItem(key) {
      const defaults = {
        items: { component: 'banner' },
        blocks: 'heroBanner',
        fields: { type: 'text', value: '' },
        options: { label: 'Opção', value: '' }
      };
      
      return defaults[key] || {};
    },
    
    initializeSortables() {
      const sortableContainers = this.$el.querySelectorAll('.sortable-list');
      
      sortableContainers.forEach(container => {
        if (container.sortable) {
          container.sortable.destroy();
        }
        
        const sortable = new Sortable(container, {
          draggable: '.sortable-item',
          handle: '.drag-handle',
          mirror: {
            appendTo: container,
            constrainDimensions: true
          }
        });
        
        container.sortable = sortable;
        
        sortable.on('sortable:stop', (evt) => {
          this.onSortEnd(evt, container);
        });
      });
    },
    
    onSortEnd(evt, container) {
      const { oldIndex, newIndex } = evt;
      
      if (oldIndex === newIndex) return;
      
      // Encontrar qual array foi reordenado
      const refName = container.getAttribute('ref');
      const arrayKey = refName.replace('sortable-', '');
      
      const array = [...this.data[arrayKey]];
      const [movedItem] = array.splice(oldIndex, 1);
      array.splice(newIndex, 0, movedItem);
      
      this.$emit('update', {
        path: [...this.path, arrayKey],
        value: array,
        type: 'array-reorder'
      });
    }
  }
};

export default {
  name: 'ThemeEditorComplete',
  components: {
    PropertyEditor
  },
  data() {
    return {
      theme: JSON.parse(JSON.stringify(themeData)),
      activeSection: null,
      activeKey: null,
      showPreview: true,
      collapsedSections: {
        settings: false,
        pages: false,
        blocks: false,
        components: true,
        elements: true
      }
    };
  },
  computed: {
    currentData() {
      if (!this.activeSection || !this.activeKey) return null;
      return this.theme[this.activeSection][this.activeKey];
    }
  },
  methods: {
    getDisplayName(key) {
      const displayNames = {
        // Settings
        colors: '🎨 Cores',
        typography: '📝 Tipografia',
        spacing: '📏 Espaçamento',
        breakpoints: '📱 Breakpoints',
        
        // Pages
        home: '🏠 Início',
        product: '📦 Produto',
        category: '📂 Categoria',
        brand: '🏷️ Marca',
        search: '🔍 Busca'
      };
      
      return displayNames[key] || key.charAt(0).toUpperCase() + key.slice(1);
    },
    
    toggleSection(section) {
      this.$set(this.collapsedSections, section, !this.collapsedSections[section]);
    },
    
    openEditor(section, key) {
      this.activeSection = section;
      this.activeKey = key;
    },
    
    togglePreview() {
      this.showPreview = !this.showPreview;
    },
    
    updateProperty(update) {
      let target = this.theme;
      
      // Navegar até o local correto
      for (let i = 0; i < update.path.length - 1; i++) {
        target = target[update.path[i]];
      }
      
      // Atualizar o valor
      const lastKey = update.path[update.path.length - 1];
      this.$set(target, lastKey, update.value);
      
      // Auto-save
      this.saveTheme();
    },
    
    saveTheme() {
      try {
        localStorage.setItem('vue-glamour-theme-complete', JSON.stringify(this.theme));
        this.showToast('Tema salvo com sucesso!', 'success');
      } catch (error) {
        console.error('Erro ao salvar tema:', error);
        this.showToast('Erro ao salvar tema!', 'error');
      }
    },
    
    loadTheme() {
      try {
        const savedTheme = localStorage.getItem('vue-glamour-theme-complete');
        if (savedTheme) {
          this.theme = JSON.parse(savedTheme);
          this.showToast('Tema carregado com sucesso!', 'success');
        }
      } catch (error) {
        console.error('Erro ao carregar tema:', error);
        this.showToast('Erro ao carregar tema!', 'error');
      }
    },
    
    exportTheme() {
      const dataStr = JSON.stringify(this.theme, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
      
      const exportFileDefaultName = `${this.theme.themeName || 'theme'}-${Date.now()}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
      
      this.showToast('Tema exportado com sucesso!', 'success');
    },
    
    importTheme() {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.json';
      
      input.onchange = (event) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            try {
              const importedTheme = JSON.parse(e.target.result);
              this.theme = importedTheme;
              this.saveTheme();
              this.showToast('Tema importado com sucesso!', 'success');
            } catch (error) {
              this.showToast('Erro ao importar tema: arquivo inválido!', 'error');
            }
          };
          reader.readAsText(file);
        }
      };
      
      input.click();
    },
    
    showToast(message, type = 'info') {
      // Implementação simples de toast
      console.log(`${type.toUpperCase()}: ${message}`);
    }
  },
  
  mounted() {
    this.loadTheme();
  }
};
</script>

<style scoped>
.theme-editor {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f8f9fa;
}

.editor-header {
  background: #fff;
  border-bottom: 1px solid #dee2e6;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.editor-body {
  flex: 1;
  overflow: hidden;
}

.editor-sidebar {
  width: 300px;
  background: #fff;
  border-right: 1px solid #dee2e6;
  overflow-y: auto;
  padding: 1rem 0;
}

.sidebar-section {
  margin-bottom: 1.5rem;
}

.sidebar-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: #495057;
  padding: 0.5rem 1rem;
  margin: 0;
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
  transition: background-color 0.2s ease;
}

.sidebar-title:hover {
  background: #f8f9fa;
}

.toggle-icon {
  margin-right: 0.5rem;
  font-size: 0.7rem;
  transition: transform 0.2s ease;
}

.sidebar-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-item {
  padding: 0.5rem 1rem 0.5rem 2rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  font-size: 0.85rem;
  color: #6c757d;
}

.sidebar-item:hover {
  background: #e9ecef;
  color: #495057;
}

.sidebar-item.active {
  background: #007bff;
  color: #fff;
}

.item-icon {
  margin-right: 0.5rem;
  font-size: 0.8rem;
}

.editor-main {
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
}

.editor-panel {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  height: 100%;
}

.panel-header {
  padding: 1.5rem 1.5rem 1rem;
  border-bottom: 1px solid #dee2e6;
}

.panel-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #495057;
  margin: 0;
}

.panel-body {
  padding: 1.5rem;
  height: calc(100% - 80px);
  overflow-y: auto;
}

.editor-preview {
  width: 400px;
  background: #fff;
  border-left: 1px solid #dee2e6;
  display: flex;
  flex-direction: column;
}

.preview-header {
  padding: 1rem;
  border-bottom: 1px solid #dee2e6;
  display: flex;
  justify-content: between;
  align-items: center;
}

.preview-title {
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
}

.preview-content {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  font-family: 'Courier New', monospace;
  font-size: 0.75rem;
  background: #f8f9fa;
}

.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

/* Property Editor Styles */
.property-editor {
  max-width: 100%;
}

.property-group {
  margin-bottom: 1.5rem;
}

.property-label {
  display: block;
  font-weight: 500;
  color: #495057;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.property-label.collapsible {
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
}

.property-label.collapsible:hover {
  color: #007bff;
}

.object-content {
  margin-left: 1rem;
  padding-left: 1rem;
  border-left: 2px solid #e9ecef;
}

.array-property {
  border: 1px solid #dee2e6;
  border-radius: 6px;
  padding: 1rem;
  background: #f8f9fa;
}

.array-list {
  margin-top: 0.5rem;
}

.array-item {
  background: #fff;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  overflow: hidden;
}

.sortable-item {
  cursor: move;
}

.array-item-header {
  background: #e9ecef;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.85rem;
  font-weight: 500;
}

.drag-handle {
  color: #6c757d;
  cursor: grab;
  margin-right: 0.5rem;
}

.drag-handle:active {
  cursor: grabbing;
}

.item-title {
  flex: 1;
}

.array-item-content {
  padding: 1rem;
}

.color-input {
  display: flex;
  align-items: center;
}

.form-control-color {
  width: 50px;
  height: 38px;
  padding: 0;
}

.primitive-property {
  margin-bottom: 1rem;
}

.form-control, .form-check-input {
  font-size: 0.85rem;
}

/* Drag & Drop Visual Feedback */
.draggable--is-dragging {
  opacity: 0.5;
  transform: rotate(2deg);
}

.draggable-mirror {
  opacity: 0.8;
  transform: rotate(2deg);
  box-shadow: 0 10px 20px rgba(0,0,0,0.2);
}

.sortable-placeholder {
  background: #e3f2fd;
  border: 2px dashed #1976d2;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  height: 60px;
}

/* Responsive */
@media (max-width: 768px) {
  .editor-body {
    flex-direction: column;
  }
  
  .editor-sidebar {
    width: 100%;
    height: 200px;
  }
  
  .editor-preview {
    width: 100%;
    height: 200px;
  }
}
</style>
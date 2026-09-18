# Roadmap - Tema Loja Integrada 2026

## 📋 Análise do Código Atual

### ✅ Pontos Positivos

- **Estrutura modular** bem organizada com objeto `theme` centralizado
- **Sistema de configuração** através de `theme.settings` e `theme.lang`
- **CSS com variáveis CSS** (`:root`) facilitando customização
- **Sliders configuráveis** para diferentes contextos
- **Responsive design** com tratamento mobile/desktop
- **Sistema de workers** para funcionalidades adicionais
- **Side cart** implementado com boa UX

### ⚠️ Pontos de Melhoria Identificados

#### 1. **Performance & Otimização**

- ❌ Biblioteca Slick completa minificada no arquivo (linhas 1-200)
- ❌ Múltiplas manipulações DOM sem debounce
- ❌ Eventos duplicados em alguns casos
- ❌ Falta de lazy loading para imagens
- ❌ CSS muito extenso (3432 linhas) sem divisão modular

#### 2. **Manutenibilidade**

- ❌ Código JavaScript misturado (library + tema)
- ❌ Falta de comentários em seções complexas
- ❌ Algumas funções muito grandes
- ❌ Variáveis globais demais no objeto `theme`
- ❌ Falta versionamento de recursos

#### 3. **Boas Práticas**

- ❌ Uso de jQuery em vez de JavaScript moderno
- ❌ Callbacks em vez de Promises/Async-Await
- ❌ Alguns seletores muito específicos
- ❌ Magic numbers em vários lugares
- ❌ Falta validação de dados em algumas funções

#### 4. **Acessibilidade**

- ⚠️ Alguns elementos sem ARIA labels
- ⚠️ Contraste de cores não validado
- ⚠️ Falta de navegação por teclado em alguns componentes

#### 5. **SEO**

- ⚠️ Breadcrumbs básicos
- ⚠️ Structured data limitado
- ⚠️ Meta tags dinâmicas poderiam ser melhoradas

---

## 🎯 Roadmap de Melhorias

### FASE 1: Organização & Estrutura (Prioridade Alta)

**Timeline: 1-2 semanas**

#### 1.1 Separar Dependências

- [ ] Remover biblioteca Slick do arquivo principal
- [ ] Criar arquivo `vendors.js` separado
- [ ] Implementar carregamento assíncrono de bibliotecas
- [ ] Adicionar sistema de versionamento (cache busting)

#### 1.2 Modularizar CSS

- [ ] Dividir `style.css` em módulos:
  ```
  /css
    ├── base.css (reset, variáveis)
    ├── layout.css (grid, containers)
    ├── components.css (botões, forms, cards)
    ├── header.css
    ├── footer.css
    ├── product-list.css
    ├── product-page.css
    └── utilities.css
  ```
- [ ] Implementar build process (concat/minify)

#### 1.3 Modularizar JavaScript

- [ ] Separar em módulos:
  ```javascript
  /js
    ├── core.js (theme object, init)
    ├── header.js
    ├── cart.js
    ├── search.js
    ├── product.js
    ├── filters.js
    └── workers/
        ├── testimonials.js
        ├── whatsapp.js
        └── size-table.js
  ```

---

### FASE 2: Performance (Prioridade Alta)

**Timeline: 1-2 semanas**

#### 2.1 Otimização de Imagens

```javascript
// Implementar lazy loading
theme.functions.lazyLoadImages = function () {
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          imageObserver.unobserve(img);
        }
      });
    });

    document.querySelectorAll("img[data-src]").forEach((img) => {
      imageObserver.observe(img);
    });
  }
};
```

#### 2.2 Debounce & Throttle

```javascript
// Adicionar helpers de performance
theme.utils = {
  debounce: function (func, wait) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  },
  throttle: function (func, limit) {
    let inThrottle;
    return function (...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  },
};

// Aplicar em resize/scroll
$(window).on(
  "resize",
  theme.utils.debounce(function () {
    theme.functions.sideCartScroll();
    theme.functions.productListImageSize(theme.settings.imageSize);
  }, 250)
);
```

#### 2.3 Critical CSS

- [ ] Extrair CSS critical (above the fold)
- [ ] Implementar inline no `<head>`
- [ ] Carregar resto de forma assíncrona

---

### FASE 3: Editor Visual (Prioridade Média-Alta)

**Timeline: 3-4 semanas**

#### 3.1 Interface de Configuração

Criar arquivo `theme-editor.html` que permite editar via interface:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Editor de Tema - Loja Integrada</title>
    <style>
      /* Estilos do editor */
      .editor-container {
        display: grid;
        grid-template-columns: 300px 1fr;
      }
      .editor-sidebar {
        background: #f5f5f5;
        padding: 20px;
      }
      .editor-preview {
        padding: 20px;
      }
      .editor-group {
        margin-bottom: 30px;
      }
      .editor-field {
        margin-bottom: 15px;
      }
    </style>
  </head>
  <body>
    <div class="editor-container">
      <div class="editor-sidebar">
        <h1>Configurações do Tema</h1>

        <!-- CORES -->
        <div class="editor-group">
          <h3>🎨 Cores</h3>
          <div class="editor-field">
            <label>Cor Principal</label>
            <input type="color" id="primaryColor" value="#000000" />
          </div>
          <div class="editor-field">
            <label>Cor Secundária</label>
            <input type="color" id="secondaryColor" value="#666666" />
          </div>
        </div>

        <!-- TIPOGRAFIA -->
        <div class="editor-group">
          <h3>📝 Tipografia</h3>
          <div class="editor-field">
            <label>Fonte do Corpo</label>
            <select id="bodyFont">
              <option value="Poppins">Poppins</option>
              <option value="Roboto">Roboto</option>
              <option value="Open Sans">Open Sans</option>
            </select>
          </div>
          <div class="editor-field">
            <label>Tamanho (px)</label>
            <input type="number" id="bodySize" value="12" min="10" max="20" />
          </div>
        </div>

        <!-- HEADER -->
        <div class="editor-group">
          <h3>📌 Cabeçalho</h3>
          <div class="editor-field">
            <label>Altura Logo Desktop (px)</label>
            <input
              type="number"
              id="logoDesktop"
              value="70"
              min="40"
              max="120"
            />
          </div>
          <div class="editor-field">
            <label>Altura Logo Mobile (px)</label>
            <input type="number" id="logoMobile" value="40" min="30" max="80" />
          </div>
          <div class="editor-field">
            <label>
              <input type="checkbox" id="invertHeader" />
              Inverter cores do header
            </label>
          </div>
        </div>

        <!-- PRODUTOS -->
        <div class="editor-group">
          <h3>🛍️ Produtos</h3>
          <div class="editor-field">
            <label>Proporção de Imagens</label>
            <input
              type="range"
              id="imageSize"
              min="0.8"
              max="2"
              step="0.1"
              value="1.4"
            />
            <span id="imageSizeValue">1.4</span>
          </div>
          <div class="editor-field">
            <label>
              <input type="checkbox" id="productListImageFill" />
              Preencher espaço da imagem
            </label>
          </div>
          <div class="editor-field">
            <label>Aviso de Estoque (quantidade)</label>
            <input type="number" id="avisoEstoque" value="999" min="0" />
          </div>
        </div>

        <!-- BOTÕES -->
        <div class="editor-group">
          <h3>🔘 Botões</h3>
          <div class="editor-field">
            <label>Border Radius (px)</label>
            <input
              type="number"
              id="borderRadius"
              value="30"
              min="0"
              max="50"
            />
          </div>
        </div>

        <!-- CARRINHO -->
        <div class="editor-group">
          <h3>🛒 Carrinho</h3>
          <div class="editor-field">
            <label>
              <input type="checkbox" id="sideCheckout" checked />
              Carrinho Lateral
            </label>
          </div>
        </div>

        <!-- WHATSAPP -->
        <div class="editor-group">
          <h3>💬 WhatsApp</h3>
          <div class="editor-field">
            <label>
              <input type="checkbox" id="whatsappButton" />
              Botão Flutuante
            </label>
          </div>
          <div class="editor-field">
            <label>Número (com DDI)</label>
            <input type="tel" id="whatsappNumber" placeholder="5511999999999" />
          </div>
        </div>

        <button
          id="generateCode"
          style="width: 100%; padding: 15px; background: #000; color: #fff; border: 0; cursor: pointer; font-weight: bold;"
        >
          Gerar Código
        </button>
        <button
          id="copyCode"
          style="width: 100%; padding: 15px; background: #666; color: #fff; border: 0; cursor: pointer; margin-top: 10px;"
        >
          Copiar para Clipboard
        </button>
      </div>

      <div class="editor-preview">
        <h2>📋 Código Gerado</h2>
        <p>Cole este código no início do arquivo <code>functions.js</code>:</p>
        <pre
          id="codeOutput"
          style="background: #f5f5f5; padding: 20px; border-radius: 5px; overflow-x: auto; max-height: 80vh;"
        ></pre>
      </div>
    </div>

    <script>
      // Objeto para armazenar configurações
      const config = {};

      // Função para gerar código
      function generateCode() {
        const code = `
// ============================================
// CONFIGURAÇÕES DO TEMA
// Gerado pelo Theme Editor
// Data: ${new Date().toLocaleString("pt-BR")}
// ============================================

// CORES
document.documentElement.style.setProperty('--primaryColor', '${
          document.getElementById("primaryColor").value
        }');
document.documentElement.style.setProperty('--secondaryColor', '${
          document.getElementById("secondaryColor").value
        }');

// TIPOGRAFIA
document.documentElement.style.setProperty('--bodyFontFamily', '${
          document.getElementById("bodyFont").value
        }');
document.documentElement.style.setProperty('--bodyFontSize', '${
          document.getElementById("bodySize").value
        }px');

// HEADER
document.documentElement.style.setProperty('--logoDesktop', '${
          document.getElementById("logoDesktop").value
        }px');
document.documentElement.style.setProperty('--logoMobile', '${
          document.getElementById("logoMobile").value
        }px');
theme.settings.invertHeader = ${
          document.getElementById("invertHeader").checked
        };

// PRODUTOS
theme.settings.imageSize = ${document.getElementById("imageSize").value};
theme.settings.productListImageFill = ${
          document.getElementById("productListImageFill").checked
        };
theme.settings.avisoEstoque = ${document.getElementById("avisoEstoque").value};

// BOTÕES
document.documentElement.style.setProperty('--borderRadius', '${
          document.getElementById("borderRadius").value
        }px');

// CARRINHO
theme.settings.sideCheckout = ${
          document.getElementById("sideCheckout").checked
        };

// WHATSAPP
theme.settings.whatsappButton = ${
          document.getElementById("whatsappButton").checked
        };
theme.worker.floatingWhatsapp.config.number = '${
          document.getElementById("whatsappNumber").value
        }';
`;

        document.getElementById("codeOutput").textContent = code;
      }

      // Event listeners
      document
        .getElementById("generateCode")
        .addEventListener("click", generateCode);

      document.getElementById("copyCode").addEventListener("click", () => {
        const code = document.getElementById("codeOutput").textContent;
        navigator.clipboard.writeText(code).then(() => {
          alert("Código copiado para o clipboard!");
        });
      });

      // Atualizar valor do range
      document.getElementById("imageSize").addEventListener("input", (e) => {
        document.getElementById("imageSizeValue").textContent = e.target.value;
      });

      // Gerar código inicial
      generateCode();
    </script>
  </body>
</html>
`.trim();
```

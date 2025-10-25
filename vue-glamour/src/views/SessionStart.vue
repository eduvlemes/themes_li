<template>
  <div class="d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
    <div class="text-center">
      <h1 class="display-4 mb-4">Vue Glamour Theme Editor</h1>
      <p class="lead mb-5">Escolha qual editor deseja usar:</p>
      
      <div class="row g-4">
        <div class="col-md-4">
          <div class="card h-100 shadow-sm">
            <div class="card-body text-center">
              <div class="mb-3">
                <ion-icon name="brush-outline" size="large" style="font-size: 4rem; color: #007bff;"></ion-icon>
              </div>
              <h5 class="card-title">Editor Simples</h5>
              <p class="card-text">Editor básico para temas existentes com estrutura simples.</p>
              <router-link to="/theme-editor" class="btn btn-primary">
                Abrir Editor Simples
              </router-link>
            </div>
          </div>
        </div>
        
        <div class="col-md-4">
          <div class="card h-100 shadow-sm">
            <div class="card-body text-center">
              <div class="mb-3">
                <ion-icon name="rocket-outline" size="large" style="font-size: 4rem; color: #28a745;"></ion-icon>
              </div>
              <h5 class="card-title">Editor Completo</h5>
              <p class="card-text">Editor avançado com suporte a blocos, componentes e elementos modulares.</p>
              <router-link to="/theme-editor-complete" class="btn btn-success">
                Abrir Editor Completo
              </router-link>
            </div>
          </div>
        </div>
        
        <div class="col-md-4">
          <div class="card h-100 shadow-sm">
            <div class="card-body text-center">
              <div class="mb-3">
                <ion-icon name="sparkles-outline" size="large" style="font-size: 4rem; color: #ffc107;"></ion-icon>
              </div>
              <h5 class="card-title">Editor Visual</h5>
              <p class="card-text">Editor visual simplificado com foco em cores e tipografia.</p>
              <router-link to="/theme-editor-new" class="btn btn-warning">
                Abrir Editor Visual
              </router-link>
            </div>
          </div>
        </div>
      </div>
      
      <div class="mt-5">
        <h6 class="text-muted">Recursos do Editor Completo:</h6>
        <div class="d-flex justify-content-center">
          <ul class="list-unstyled text-start">
            <li>✅ Estrutura hierárquica (Pages → Blocks → Components → Elements)</li>
            <li>✅ Drag & Drop para reordenação</li>
            <li>✅ Interface responsiva e intuitiva</li>
            <li>✅ Auto-save e import/export</li>
            <li>✅ Preview em tempo real</li>
            <li>✅ Suporte a todos os tipos de campo</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SessionStart'
}
</script>

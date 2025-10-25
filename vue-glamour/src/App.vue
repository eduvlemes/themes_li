<template>
  <div>
    <header class="p-3 border-bottom d-none">
      <div class="container-fluid">
        <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li><router-link to="/theme-editor" class="nav-link px-2 link-secondary">Editor de Tema</router-link></li>
            <li><router-link to="/" class="nav-link px-2 link-body-emphasis">Extensões</router-link></li>
          </ul>
  
        
          <div class="dropdown text-end">
            <a href="#" class="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" class="rounded-circle">
            </a>
            <ul class="dropdown-menu text-small">
              <li><a class="dropdown-item" href="#">Meus pedidos</a></li>
              <li><a class="dropdown-item" href="#">Meus dados</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="#">Sair</a></li>
            </ul>
          </div>
        </div>
      </div>
    </header>
    <main>
      <div class="container-fluid px-0">
        <router-view></router-view>
      </div>
    </main>
      
  </div>
</template>

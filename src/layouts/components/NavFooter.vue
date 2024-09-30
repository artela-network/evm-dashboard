<template>
  <!-- footer -->
  <footer class="bg-black sm:bg-[#0000C9] text-white py-14 sm:py-24 px-4 sm:px-0 sm:w-full z-30">
    <div class="container mx-auto flex flex-col sm:flex-row flex-wrap justify-between">
      <div class="w-full sm:w-1/4 mb-6 flex flex-row sm:flex-col gap-10 justify-between sm:justify-normal sm:border-none border-b-[0.0625rem] border-[#4d4d4d] pb-8">
        <img src="../../assets/footer/art-w.svg" alt="Artela Logo" class="w-36" />
        <div class="flex space-x-4">
          <div @click="handleLinkClick($event, 'https://x.com/artela_network')" class="text-white cursor-pointer">
            <img src="../../assets/footer/s-w.svg" alt="Email" class="w-6 h-6" />
          </div>
          <div @click="handleLinkClick($event, 'https://discord.com/invite/artelanetwork')" class="text-white cursor-pointer">
            <img src="../../assets/footer/discord-w.svg" alt="Discord" class="w-6 h-6" />
          </div>
          <div @click="handleLinkClick($event, 'https://t.me/artela_official')" class="text-white cursor-pointer">
            <img src="../../assets/footer/tg-w.svg" alt="Telegram" class="w-6 h-6" />
          </div>
        </div>
        <p class="flex">Artela Inc. All Rights Reserved.</p>
      </div>
      
      <!-- Build, Explore, About sections -->
      <div class="w-full sm:w-1/2 text-lg flex">
        <!-- Build section -->
        <div class="w-full sm:w-1/3 flex flex-col gap-6">
          <h3 class="font-bold text-white">Build</h3>
          <ul class="flex flex-col gap-4">
            <li @click="handleLinkClick($event, 'https://artela.network/build/intro-to-artela')" class="text-[#FFFFFFAA] hover:text-[#FFFFFFEF] text-base cursor-pointer">Intro to Artela</li>
            <li @click="handleLinkClick($event, 'https://artela.network/home-artela-frontier')" class="text-[#FFFFFFAA] hover:text-[#FFFFFFEF] text-base cursor-pointer">Artela Frontier</li>
            <li @click="handleLinkClick($event, 'https://artela.network/build/developer-portal')" class="text-[#FFFFFFAA] hover:text-[#FFFFFFEF] text-base cursor-pointer">Developer Portal</li>
            <li @click="handleLinkClick($event, 'https://docs.artela.network/develop')" class="text-[#FFFFFFAA] hover:text-[#FFFFFFEF] text-base cursor-pointer">Documentation</li>
            <li @click="handleLinkClick($event, 'https://docs.google.com/forms/d/e/1FAIpQLSfHGowv6w0xN-JU9k4KOOr0ZlAIueQECgW8S6xZf8rJQMAihA/viewform')" class="text-[#FFFFFFAA] hover:text-[#FFFFFFEF] text-base cursor-pointer">Become a Partner</li>
          </ul>
        </div>
        
        <!-- Explore section -->
        <div class="w-full sm:w-1/3 flex flex-col gap-6">
          <h3 class="font-bold text-white">Explore</h3>
          <ul class="flex flex-col gap-4">
            <li @click="handleLinkClick($event, 'https://artela.network/explore/aspect-hub')" class="text-[#FFFFFFAA] hover:text-[#FFFFFFEF] text-base cursor-pointer">Aspect Hub</li>
            <li @click="handleLinkClick($event, 'https://github.com/artela-network/aspect-whitepaper/blob/main/latex/build/whitepaper.pdf')" class="text-[#FFFFFFAA] hover:text-[#FFFFFFEF] text-base cursor-pointer">Whitepaper</li>
            <li @click="handleLinkClick($event, 'https://artela.notion.site/Artela-Community-Center-31ee85ab3cbb45f1b59fb58093313e26')" class="text-[#FFFFFFAA] hover:text-[#FFFFFFEF] text-base cursor-pointer">Community Center</li>
          </ul>
        </div>
        
        <!-- About section -->
        <div class="w-full sm:w-1/3 flex flex-col gap-6">
          <h3 class="font-bold text-white">About</h3>
          <ul class="flex flex-col gap-4">
            <li @click="handleLinkClick($event, 'https://artela.network/blog')" class="text-[#FFFFFFAA] hover:text-[#FFFFFFEF] text-base cursor-pointer">Blog</li>
            <li @click="handleLinkClick($event, 'mailto:info@artela.network')" class="text-[#FFFFFFAA] hover:text-[#FFFFFFEF] text-base cursor-pointer">Contact</li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">


const handleLinkClick = (e: Event, uri: string) => {
  e.preventDefault();
  if (uri.startsWith('https://artela.network')) {
    window.parent.location.href = uri;
  } else {
    window.open(uri, '_blank');
  }
};
</script>
export function renderSettings()
{
    return `
    <app-navbar></app-navbar>
    
    <main class="ml-[80px] min-h-screen bg-black PText font-mono p-8 flex flex-col gap-8 relative overflow-hidden">
        
        <div class="border-b-2 PDarkBorder pb-4 z-10">
            <h1 class="text-4xl font-bold tracking-widest flex items-center gap-4">
                <span class="animate-spin-slow">⚙️</span>
                SETTINGS
            </h1>
            <p class="text-xs opacity-50 mt-2 pl-1">> CONFIGURATION_PROFIL</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 z-10 max-w-6xl mx-auto w-full">
            
            <section class="border-2 PBoxBorder bg-black/30 p-6 rounded-xl relative group PDarkBoxHover transition-all">
                <h2 class="text-xl font-bold mb-6 border-b PDarkBorder pb-2 flex justify-between items-center">
                    <span>[ AVATAR ]</span>
                    <span class="text-xs opacity-50">PROFIL</span>
                </h2>
                
                <div class="flex items-center gap-8">
                    <div class="relative w-32 h-32 flex-shrink-0">
                        <div class="absolute inset-0 rounded-full border-2 border-dashed PBorder animate-[spin_10s_linear_infinite] opacity-50"></div>
                        <img src="/image/avatar/default/cara.jpg" alt="Avatar" 
                             class="w-full h-full rounded-full object-cover border-4 PBoxBorder shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                    </div>

                    <div class="flex-1 space-y-3">
                        <p class="text-xs opacity-70">Formats supportés: JPG, PNG, GIF.<br>Taille max: 5MB.</p>
                        <button class="w-full border PBoxBorder PText px-4 py-2 rounded hover:bg-white/5 transition-colors uppercase text-xs font-bold tracking-wider flex items-center justify-center gap-2">
                            <span></span> NOUVELLE PHOTO
                        </button>
                        <button class="w-full border border-red-500 text-red-500 px-4 py-2 rounded hover:bg-red-500/10 transition-colors uppercase text-xs font-bold tracking-wider">
                            X SUPPRIMER
                        </button>
                    </div>
                </div>
            </section>

            <section class="border-2 PBoxBorder bg-black/30 p-6 rounded-xl PDarkBoxHover transition-all flex flex-col">
                <h2 class="text-xl font-bold mb-6 border-b PDarkBorder pb-2 flex justify-between items-center">
                    <span>[ THEME ]</span>
                    <span class="text-xs opacity-50">COULEURS</span>
                </h2>

                <div class="space-y-4 flex-1">
                    <label class="text-xs uppercase opacity-70 block mb-2">> Sélectionner la couleur de l'interface</label>
                    
                    <button class="w-full flex items-center justify-between p-3 border-2 PBoxBorder bg-white/5 rounded cursor-pointer group">
                        <span class="font-bold">> VERT</span>
                        <div class="w-4 h-4 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]"></div>
                    </button>

                    <button class="w-full flex items-center justify-between p-3 border PDarkBorder rounded cursor-pointer hover:bg-white/5 opacity-60 hover:opacity-100 transition-all">
                        <span>> BLEU</span>
                        <div class="w-4 h-4 rounded-full bg-cyan-500"></div>
                    </button>

                    <button class="w-full flex items-center justify-between p-3 border PDarkBorder rounded cursor-pointer hover:bg-white/5 opacity-60 hover:opacity-100 transition-all">
                        <span>> ROUGE</span>
                        <div class="w-4 h-4 rounded-full bg-red-500"></div>
                    </button>
                </div>
            </section>

            <section class="lg:col-span-2 border-2 PBoxBorder bg-black/30 p-6 rounded-xl PDarkBoxHover transition-all">
                <h2 class="text-xl font-bold mb-6 border-b PDarkBorder pb-2 flex justify-between items-center">
                    <span>[ BIO ]</span>
                    <span class="text-xs opacity-50">BIOGRAPHIE</span>
                </h2>

                <div class="space-y-2">
                    <div class="flex justify-between text-xs opacity-70">
                        <label>> Description publique</label>
                        <span>0/250 caractères</span>
                    </div>
                    
                    <textarea class="w-full h-32 bg-black border PDarkBorder rounded p-4 PText focus:outline-none focus:border-white/50 transition-colors resize-none placeholder-white/20 font-mono"
                              placeholder="// Écrivez quelque chose à propos de vous..."></textarea>
                </div>
            </section>
        </div>

        <div class="flex justify-end mt-4 max-w-6xl mx-auto w-full">
            <button class="PBoxBg text-black font-black py-3 px-10 rounded-lg text-lg hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all uppercase tracking-widest">
                [ SAUVEGARDER ]
            </button>
        </div>

    </main>
    `;
}
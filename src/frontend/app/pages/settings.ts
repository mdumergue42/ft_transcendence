import {ChatUser} from '../components/chat/chat.js'

function selectedColor(colorTxt: string, colorCircle: string, colorShadow: string, isSelected: boolean)
{
	return `
		<div class="w-full flex items-center justify-between p-3 rounded cursor-pointer
		${isSelected ? "border-2  PBoxBorder bg-white/5"
			: "border PDarkBorder hover:bg-white/5 opacity-60 hover:opacity-100 transition-all"}">
			<span class="uppercase ${isSelected ? 'font-bold' : ''}">> ${colorTxt} </span>
			<div class="w-4 h-4 rounded-full ${colorCircle} ${isSelected ? colorShadow : ''}"></div>
		</div>
	`
}

export function renderSettings()
{
    return `
    <app-def>
    
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
                        <p class="text-xs opacity-70">Supported formats: JPG, PNG, GIF.<br>Max size: 5MB.</p>
                        <button class="w-full border PBoxBorder PText px-4 py-2 rounded hover:bg-white/5 transition-colors uppercase text-xs font-bold tracking-wider flex items-center justify-center gap-2">
                            <span></span> NEW AVATAR
                        </button>
                        <button class="w-full border border-red-500 text-red-500 px-4 py-2 rounded hover:bg-red-500/10 transition-colors uppercase text-xs font-bold tracking-wider">
                            X DELETE
                        </button>
                    </div>
                </div>
            </section>

            <section class="border-2 PBoxBorder bg-black/30 p-6 rounded-xl PDarkBoxHover transition-all flex flex-col">
                <h2 class="text-xl font-bold mb-6 border-b PDarkBorder pb-2 flex justify-between items-center">
                    <span>[ THEME ]</span>
                    <span class="text-xs opacity-50">COLORS</span>
                </h2>

                <div class="space-y-4 flex-1">
                    <label class="text-xs uppercase opacity-70 block mb-2">> Chose interface color </label>
                    
					<button id="green-btn" class="w-full flex items-center justify-between">
						${selectedColor("green", "bg-green-500", "shadow-[0_0_10px_#22c55e]", true)}
					</button>
					<button id="blue-btn" class="w-full flex items-center justify-between">
						${selectedColor("blue", "bg-cyan-500", "", false)}
					</button>
					<button id="red-btn" class="w-full flex items-center justify-between">
						${selectedColor("red", "bg-red-500", "", false)}
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
                        <label>> Change your bio </label>
                        <span id="bio-count">0/60</span>
                    </div>
                    
                    <textarea id="bio-text" maxlength="60" class="w-full h-32 bg-black border PDarkBorder rounded p-4 PText focus:outline-none focus:border-white/50 transition-colors resize-none placeholder-white/20 font-mono"
                              placeholder="// Write something about you..."></textarea>
                </div>
            </section>
        </div>

        <div class="flex justify-end mt-4 max-w-6xl mx-auto w-full">
            <button id="save-btn" class="PBoxBg text-black font-black py-3 px-10 rounded-lg text-lg hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all uppercase tracking-widest">
                [ SAVE ]
            </button>
        </div>

    </app-def>
    `;
}

function setColors(redBtn: HTMLButtonElement, greenBtn: HTMLButtonElement, blueBtn: HTMLButtonElement,
				  redBool:boolean, greenBool:boolean, blueBool:boolean)
{
	greenBtn.innerHTML = selectedColor("green", "bg-green-500", "shadow-[0_0_10px_#22c55e]", greenBool);
	blueBtn.innerHTML = selectedColor("blue", "bg-cyan-500", "shadow-[0_0_10px_#1a30c4]", blueBool);
	redBtn.innerHTML = selectedColor("red", "bg-red-500", "shadow-[0_0_10px_#c41a25]", redBool);
}

function importUserSettings(redBtn: HTMLButtonElement, greenBtn: HTMLButtonElement, blueBtn: HTMLButtonElement, bio:HTMLTextAreaElement,
					user: ChatUser)
{
	setColors(redBtn, greenBtn, blueBtn,
			  user.color == "red", user.color == "green", user.color == "blue");
	if (user.desc.length != 0)
		bio.value = user.desc;
	//TODO mettre dans la page settings, les settings du user
	return user.color
}
function exportUserSettings(user: ChatUser, bio: string, color: string, avatar: string)
{
	//TODO avatar is a string??
}
export function DevSettings(user: ChatUser)
{

	let saveBtn = <HTMLButtonElement>document.getElementById("save-btn");
	if (!saveBtn)
		return ;
	const bio = <HTMLTextAreaElement>document.getElementById("bio-text")!;
	const bioCount = <HTMLSpanElement>document.getElementById("bio-count")!;

	let redBtn = <HTMLButtonElement>document.getElementById("red-btn");
	let greenBtn = <HTMLButtonElement>document.getElementById("green-btn");
	let blueBtn = <HTMLButtonElement>document.getElementById("blue-btn");
	
	var color = importUserSettings(redBtn, greenBtn, blueBtn, bio, user);

	bio.addEventListener("keyup", ({key}) => {
		bioCount.innerHTML = `${bio.value.length}/60`;
	})

	blueBtn.onclick = () => {
		setColors(redBtn, greenBtn, blueBtn, false, false, true);
		color = "blue";
	}
	redBtn.onclick = () => {
		setColors(redBtn, greenBtn, blueBtn, true, false, false);
		color = "red";
	}
	greenBtn.onclick = () => {
		setColors(redBtn, greenBtn, blueBtn, false, true, false);
		color = "green";
	}

	saveBtn.onclick = () => {
		const txt = bio.value.replace(/\n/g, " ");
		user.updateColor(color);
		user.updateDesc(txt);
		user.updateUser(color, "", txt);
	}
}

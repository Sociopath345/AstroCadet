// Game Configuration, Data & Mission Events
window.MISSION_DATA = {
    destinations: {
        moon: {
            id: 'moon',
            nameKey: 'dest_moon_title',
            descKey: 'dest_moon_desc',
            maxMass: 8000,
            bgColor: '#0a0d16',
            surfaceColor: '#5c6479',
            gravity: 1.62,
            basePowerGen: 30,
            nightPowerLoss: 25,
            radiationRisk: 'High',
            requirements: {
                engine: ['eng_light', 'eng_standard', 'eng_powerful'],
                fuel: ['fuel_standard', 'fuel_large'],
                capsule: ['cap_compact', 'cap_standard', 'cap_large'],
                life_support: ['life_standard', 'life_extended'],
                food: ['food_packs', 'food_greenhouse', 'food_biodome'],
                power: ['pwr_solar', 'pwr_battery', 'pwr_hybrid'],
                landing: ['landing_basic', 'landing_adv'],
                exploration: ['exp_none', 'exp_mini', 'exp_science']
            }
        },
        mars: {
            id: 'mars',
            nameKey: 'dest_mars_title',
            descKey: 'dest_mars_desc',
            maxMass: 12000,
            bgColor: '#160a08',
            surfaceColor: '#a13b28',
            gravity: 3.72,
            basePowerGen: 22,
            nightPowerLoss: 15,
            radiationRisk: 'Severe',
            requirements: {
                engine: ['eng_standard', 'eng_powerful'],
                fuel: ['fuel_large'],
                capsule: ['cap_compact', 'cap_standard', 'cap_large'],
                life_support: ['life_extended'],
                food: ['food_greenhouse', 'food_biodome'],
                power: ['pwr_battery', 'pwr_hybrid'],
                landing: ['landing_adv'],
                exploration: ['exp_none', 'exp_mini', 'exp_science']
            }
        }
    },

    categories: [
        { id: 'engine', nameKey: 'cat_engine', icon: '🚀' },
        { id: 'fuel', nameKey: 'cat_fuel', icon: '⛽' },
        { id: 'capsule', nameKey: 'cat_capsule', icon: '🏠' },
        { id: 'life_support', nameKey: 'cat_life_support', icon: '🫁' },
        { id: 'food', nameKey: 'cat_food', icon: '🌱' },
        { id: 'power', nameKey: 'cat_power', icon: '⚡' },
        { id: 'landing', nameKey: 'cat_landing', icon: '🛡️' },
        { id: 'exploration', nameKey: 'cat_exploration', icon: '🔬' }
    ],

    payloadItems: {
        engine: [
            { id: 'eng_light', name: { en: 'Light Thruster Engine', my: 'ပေါ့ပါးသော အင်ဂျင်' }, mass: 1000, efficiency: 1.0, icon: '🔥', desc: { en: 'Economical thrust for smaller lunar payloads.', my: 'ပေါ့ပါး၍ လကမ္ဘာသုံးအတွက် သင့်တော်သည်။' } },
            { id: 'eng_standard', name: { en: 'Standard Cryo Engine', my: 'စံပြု ခရိုင်ယို အင်ဂျင်' }, mass: 2000, efficiency: 1.25, icon: '🚀', desc: { en: 'Reliable hydrolox staged combustion rocket engine.', my: 'အသုံးများပြီး ယုံကြည်စိတ်ချရသော ဒုံးပျံအင်ဂျင်။' } },
            { id: 'eng_powerful', name: { en: 'Heavy Lift Fusion Raptor', my: 'အကြီးစား တွန်းအားပြင်း အင်ဂျင်' }, mass: 3000, efficiency: 1.6, icon: '⚡🚀', desc: { en: 'Maximum thrust capacity needed for heavy Mars transit.', my: 'အင်္ဂါဂြိုဟ်သို့ သယ်ဆောင်ရန် အကောင်းဆုံး စွမ်းအားပြင်း အင်ဂျင်။' } }
        ],
        fuel: [
            { id: 'fuel_small', name: { en: 'Small Fuel Cell (1,000kg)', my: 'လောင်စာတိုင်ငယ်' }, mass: 1000, capacity: 1000, icon: '🛢️', desc: { en: 'Minimal fuel for suborbital and light maneuvers.', my: 'ပေါ့ပါးသော လောင်စာဆီ ပမာဏ။' } },
            { id: 'fuel_standard', name: { en: 'Standard Fuel Tank (2,000kg)', my: 'စံပြု လောင်စာကန်' }, mass: 2000, capacity: 2000, icon: '⛽', desc: { en: 'Balanced propellant for Lunar orbital insertion.', my: 'လကမ္ဘာ ပတ်လမ်းဝင်ရန် လုံလောက်သော လောင်စာ။' } },
            { id: 'fuel_large', name: { en: 'Extended Deep-Space Tank (3,500kg)', my: 'အကြီးစား လောင်စာကန်' }, mass: 3500, capacity: 3500, icon: '🔋⛽', desc: { en: 'Massive propellant mass required for interplanetary Mars transfer.', my: 'အင်္ဂါဂြိုဟ်သို့ ခရီးရှည်သွားရန် မရှိမဖြစ် လောင်စာကန်။' } }
        ],
        capsule: [
            { id: 'cap_compact', name: { en: 'Compact Capsule', my: 'ရိုးရိုး အာကာသယာဉ်ခန်း' }, mass: 1000, moraleBase: 65, icon: '🛸', desc: { en: 'Tight quarters. Efficient but higher crew psychological fatigue.', my: 'နေရာကျဉ်းကျပ်သဖြင့် ယာဉ်မှူးများ စိတ်ဖိစီးမှု မြန်နိုင်သည်။' } },
            { id: 'cap_standard', name: { en: 'Standard Crew Quarters', my: 'စံပြု ယာဉ်မှူးအခန်း' }, mass: 1500, moraleBase: 80, icon: '🏠', desc: { en: 'Ergonomic habitat module with sleep pods and galley.', my: 'အိပ်စက်ရန်နှင့် နေထိုင်ရန် သက်တောင့်သက်သာရှိသော အခန်း။' } },
            { id: 'cap_large', name: { en: 'Expedition Bio-Hab', my: 'ဇီဝ-နေထိုင်ရေး အခန်းကျယ်' }, mass: 2500, moraleBase: 95, icon: '🏰', desc: { en: 'Spacious microgravity living space with exercise bay.', my: 'အားကစားနှင့် သက်တောင့်သက်သာ နားနေနိုင်သော အခန်းကျယ်။' } }
        ],
        life_support: [
            { id: 'life_basic', name: { en: 'Basic O₂ Scrubber (300kg)', my: 'ရိုးရိုး အောက်ဆီဂျင်စနစ်' }, mass: 300, o2Gen: 10, h2oRec: 0.40, icon: '🫧', desc: { en: 'Chemical oxygen candles and consumable canisters.', my: 'ရိုးရိုး ဓာတု အောက်ဆီဂျင် ထုတ်လုပ်မှု။' } },
            { id: 'life_standard', name: { en: 'Standard ECLSS (600kg)', my: 'စံပြု ECLSS အသက်ကယ်စနစ်' }, mass: 600, o2Gen: 18, h2oRec: 0.70, icon: '🫁', desc: { en: 'NASA-grade electrolysis and catalytic water purifier.', my: 'NASA စံနှုန်းမီ လေနှင့် ရေ ပြန်လည်သန့်စင်စနစ်။' } },
            { id: 'life_extended', name: { en: 'Closed-Loop Regenerative ECLSS (1,000kg)', my: 'အဆင့်မြင့် လည်ပတ်မှု ECLSS' }, mass: 1000, o2Gen: 26, h2oRec: 0.92, icon: '♻️🫁', desc: { en: 'State-of-the-art Sabatier reactor and urine processor recovery.', my: 'ရေနှင့် အောက်ဆီဂျင် ၉၂% အထိ ပြန်လည်သန့်စင်ပေးနိုင်သော စနစ်။' } }
        ],
        food: [
            { id: 'food_packs', name: { en: 'Freeze-Dried Supply Packs', my: 'အခြောက်ခံ အစားအစာထုပ်များ' }, mass: 200, foodYield: 0, powerDraw: 0, waterDraw: 0, icon: '🥫', desc: { en: 'Lightweight sealed rations. Non-renewable.', my: 'ပေါ့ပါးပြီး အသင့်စားနိုင်သော်လည်း ကုန်ဆုံးလွယ်သည်။' } },
            { id: 'food_greenhouse', name: { en: 'Hydroponic Greenhouse Unit', my: 'ရေပေါ်စိုက်ပျိုးရေး ဖန်လုံအိမ်' }, mass: 500, foodYield: 14, powerDraw: 12, waterDraw: 8, icon: '🌱', desc: { en: 'LED growth lamps cultivate space lettuce, radish, and microgreens.', my: 'မုန်လာဥ၊ ဟင်းသီးဟင်းရွက်များ စိုက်ပျိုးထုတ်လုပ်ပေးသည်။' } },
            { id: 'food_biodome', name: { en: 'Industrial Aeroponic Bio-Dome', my: 'အဆင့်မြင့် ဇီဝ-စိုက်ပျိုးရေးအိမ်' }, mass: 1000, foodYield: 28, powerDraw: 22, waterDraw: 14, icon: '🌿🍅', desc: { en: 'High yield nutrient mist farming with CO₂ absorption perks.', my: 'အာဟာရဖြန်းစနစ်ဖြင့် စားနပ်ရိက္ခာ အများအပြား ထုတ်ပေးသည်။' } }
        ],
        power: [
            { id: 'pwr_solar', name: { en: 'Photovoltaic Solar Arrays', my: 'ဆိုလာပြား စွမ်းအင်စနစ်' }, mass: 300, dayGen: 35, nightGen: 0, maxStorage: 80, icon: '☀️', desc: { en: 'High efficiency solar panels. Zero production in darkness.', my: 'နေရောင်ရှိစဉ် လျှပ်စစ်ကောင်းစွာ ထုတ်လုပ်ပေးသည်။' } },
            { id: 'pwr_battery', name: { en: 'Solid-State Backup Battery', my: 'အရံ ဓာတ်ခဲစနစ်' }, mass: 200, dayGen: 15, nightGen: 10, maxStorage: 140, icon: '🔋', desc: { en: 'Dense energy storage buffering night and storm outages.', my: 'အရေးပေါ်နှင့် ညဘက်အတွက် လျှပ်စစ်သိုလှောင်မှု မြင့်မားသည်။' } },
            { id: 'pwr_hybrid', name: { en: 'Solar-Fission Hybrid Core', my: 'ဆိုလာနှင့် ဘက်ထရီ စုံတွဲစနစ်' }, mass: 500, dayGen: 45, nightGen: 20, maxStorage: 160, icon: '⚡⚛️', desc: { en: 'Continuous power generation for all planetary weather conditions.', my: 'ရာသီဥတုမရွေး စဉ်ဆက်မပြတ် လျှပ်စစ်ဓာတ်အား ပေးစွမ်းသည်။' } }
        ],
        landing: [
            { id: 'landing_basic', name: { en: 'Basic Shock Landing Legs', my: 'ရိုးရိုး ဆင်းသက်ခြေထောက်' }, mass: 300, shieldBase: 25, icon: '🦵', desc: { en: 'Pneumatic shock absorbers for low gravity landings.', my: 'လဆင်းသက်မှုအတွက် သင့်လျော်သော အခြေခံစနစ်။' } },
            { id: 'landing_adv', name: { en: 'Regolith Shield & Heavy Descent Rig', my: 'အဆင့်မြင့် အကာအကွယ်နှင့် ဆင်းသက်စနစ်' }, mass: 800, shieldBase: 65, icon: '🛡️🚜', desc: { en: 'Interlocking lunar soil radiation shields and terrain radar.', my: 'အာကာသရောင်ခြည်ဒဏ်ကို ၆၅% အထိ ကာကွယ်ပေးနိုင်သော အကာအရံ။' } }
        ],
        exploration: [
            { id: 'exp_none', name: { en: 'No Extra Vehicle (0kg)', my: 'ယာဉ် မပါဝင်ပါ' }, mass: 0, scienceYield: 0, powerCost: 0, icon: '🚫', desc: { en: 'Save payload weight for life support safety margin.', my: 'အခြား အသက်ကယ်ပစ္စည်းများ ပိုမိုတင်ဆောင်နိုင်သည်။' } },
            { id: 'exp_mini', name: { en: 'Autonomous Scout Mini-Rover', my: 'အသေးစား စူးစမ်းရေး ရိုဗာ' }, mass: 300, scienceYield: 15, powerCost: 5, icon: '🚙', desc: { en: 'Small wheeled drone collecting soil and radiation data.', my: 'မြေဆီလွှာနှင့် ရောင်ခြည်အချက်အလက် စုဆောင်းပေးသည်။' } },
            { id: 'exp_science', name: { en: 'Pressurized Science Lab Rover', my: 'အဆင့်မြင့် သိပ္ပံဓာတ်ခွဲခန်း ရိုဗာ' }, mass: 700, scienceYield: 35, powerCost: 12, icon: '🔬🚐', desc: { en: 'Mobile laboratory conducting deep ice drilling and seismic research.', my: 'ရေခဲတွင်းတူးခြင်းနှင့် အဆင့်မြင့် သိပ္ပံသုတေသနများ ပြုလုပ်နိုင်သည်။' } }
        ]
    },

    crewMembers: [
        { id: 'c1', name: 'Commander Aung', role: { en: 'Mission Commander', my: 'မစ်ရှင် ကွပ်ကဲရေးမှူး' }, avatar: '👨‍🚀', color: '#00f0ff' },
        { id: 'c2', name: 'Dr. Thida', role: { en: 'Astrobiologist & ECLSS', my: 'ဇီဝဗေဒနှင့် အသက်ကယ် ပညာရှင်' }, avatar: '👩‍🚀', color: '#39ff14' },
        { id: 'c3', name: 'Engineer Kyaw', role: { en: 'Power Grid Specialist', my: 'လျှပ်စစ်နှင့် စက်မှု အင်ဂျင်နီယာ' }, avatar: '👨‍🚀', color: '#ffe600' },
        { id: 'c4', name: 'Dr. Su', role: { en: 'Flight Medical Officer', my: 'အာကာသ ဆေးဘက်ဆိုင်ရာ အရာရှိ' }, avatar: '👩‍🚀', color: '#ff0077' }
    ],

    shifts: [
        {
            shiftNumber: 1,
            title: { en: 'Shift 1: Lunar Dust Accumulation on Arrays', my: 'အလှည့် ၁: ဆိုလာပြားပေါ် ဖုန်မှုန့်များ တင်ခြင်း' },
            desc: {
                en: 'Fine, electrostatically charged regolith dust has coated 45% of the outpost photovoltaic solar panels. Power production drops by 20 units!',
                my: 'လျှပ်စစ်ဓာတ်ဆောင်နေသော လမျက်နှာပြင် ဖုန်မှုန့်များ ဆိုလာပြားပေါ် တင်နေသဖြင့် လျှပ်စစ်ထုတ်လုပ်မှု ၂၀ ယူနစ် ကျဆင်းသွားပါသည်!'
            },
            nasaScience: {
                title: { en: 'NASA Lunar Dust Hazard & Mitigation', my: 'NASA လဖုန်မှုန့် အန္တရာယ်နှင့် ဖြေရှင်းနည်း' },
                text: { 
                    en: 'Lunar dust particles are sharp like shards of glass because there is no wind or water erosion on the Moon to smooth their edges. NASA uses Electrodynamic Dust Shields (EDS) to shake off dust without wearing out spacesuits.',
                    my: 'လကမ္ဘာတွင် လေနှင့်ရေ မရှိသောကြောင့် ဖုန်မှုန့်များသည် ဖန်ကွဲစများကဲ့သို့ ထက်မြနေပါသည်။ အာကာသယာဉ်မှူးများ ဝတ်စုံပျက်စီးခြင်းမှ ကာကွယ်ရန် လျှပ်စစ်သံလိုက် ဖုန်ခါစနစ်များကို NASA က တီထွင်အသုံးပြုပါသည်။'
                },
                link: 'https://www.nasa.gov/general/electrodynamic-dust-shield/'
            },
            choices: [
                {
                    id: 'clean_eva',
                    name: { en: 'Deploy Crew EVA to Clean Arrays', my: 'ယာဉ်မှူးများကိုယ်တိုင် အပြင်ထွက် သန့်ရှင်းရေးလုပ်ခိုင်းမည်' },
                    desc: { en: 'Fully restores Solar Power (+20), but fatigues crew (Health -5, Morale -5).', my: 'ဆိုလာစွမ်းအင် အပြည့်ပြန်ရမည် (+20)၊ သို့သော် ယာဉ်မှူးများ မောပန်းမည် (ကျန်းမာရေး -5)။' },
                    effects: { powerProd: 20, health: -5, morale: -5, science: 5 }
                },
                {
                    id: 'backup_pwr',
                    name: { en: 'Rely on Stored Battery Buffers', my: 'အရံ ဘက်ထရီ စွမ်းအင်ကို အသုံးပြုမည်' },
                    desc: { en: 'Keep crew safe inside (Health +0). Consumes 18 Stored Power.', my: 'ယာဉ်မှူးများ ဘေးကင်းမည်၊ သို့သော် သိုလှောင်ထားသော လျှပ်စစ် ၁၈ ယူနစ် ကုန်မည်။' },
                    effects: { power: -18, health: 0, morale: 0 }
                },
                {
                    id: 'throttle_greenhouse',
                    name: { en: 'Throttle Greenhouse LED Lighting', my: 'ဖန်လုံအိမ် မီးရောင်ကို လျှော့ချမည်' },
                    desc: { en: 'Saves 12 Power, but lowers Food crop growth (-10 Food yield).', my: 'လျှပ်စစ် ၁၂ ယူနစ် ချွေတာနိုင်မည်၊ သို့သော် သီးနှံထွက်နှုန်း ၁၀ ယူနစ် လျော့မည်။' },
                    effects: { power: 12, food: -10, morale: -3 }
                }
            ]
        },
        {
            shiftNumber: 2,
            title: { en: 'Shift 2: ECLSS Water Filtration Membrane Clog', my: 'အလှည့် ၂: ရေပြန်လည်သန့်စင်စက် အမှိုက်ပိတ်ဆို့ခြင်း' },
            desc: {
                en: 'Biomass buildup in the secondary catalytic filter has degraded closed-loop water recovery to 30%. Clean water tank levels are depleting quickly!',
                my: 'ရေသန့်စင်စက်၏ စစ်ထုတ်စနစ်တွင် အမှိုက်ပိတ်ဆို့နေသဖြင့် ရေပြန်လည်ရရှိမှု ၃၀% သို့ ကျဆင်းသွားပြီး ရေပြတ်လပ်နိုင်ခြေ ရှိနေပါသည်!'
            },
            nasaScience: {
                title: { en: 'NASA ECLSS Water Recovery System (WRS)', my: 'NASA ECLSS ရေပြန်လည်သန့်စင်မှု စနစ်' },
                text: { 
                    en: 'On the International Space Station, NASA\'s Water Recovery System recovers up to 98% of all moisture, including crew breath, sweat, and urine, recycling it into water purer than municipal tap water on Earth!',
                    my: 'နိုင်ငံတကာ အာကာသစခန်း (ISS) တွင် ယာဉ်မှူးများ၏ ချွေး၊ အသက်ရှူလေနှင့် ဆီးများကိုပါ ၉၈% အထိ ပြန်လည်သန့်စင်ကာ ကမ္ဘာပေါ်ရှိ ရေသန့်ထက်ပင် ပိုမိုသန့်ရှင်းသော သောက်ရေအဖြစ် ပြန်လည်ထုတ်လုပ်ပေးပါသည်။'
                },
                link: 'https://www.nasa.gov/international-space-station/space-station-research-and-technology/water-recovery-system/'
            },
            choices: [
                {
                    id: 'flush_filter',
                    name: { en: 'Execute High-Pressure Acid Flush', my: 'ဖိအားပြင်း ဓာတုဆေးရည်ဖြင့် စက်ကို ဆေးကြောမည်' },
                    desc: { en: 'Restores water recycling to 85%. Consumes 15 Power and 8 Water.', my: 'ရေပြန်လည်ရရှိမှု ၈၅% သို့ ပြန်တက်မည်။ လျှပ်စစ် ၁၅ နှင့် ရေ ၈ ယူနစ် ကုန်ကျမည်။' },
                    effects: { power: -15, water: -8, waterRec: 0.85, morale: 2 }
                },
                {
                    id: 'emergency_reserves',
                    name: { en: 'Tap Emergency Water Bladders', my: 'အရေးပေါ် သိုလှောင်ရေအိတ်များကို ဖွင့်သုံးမည်' },
                    desc: { en: 'Restores +15 Clean Water without power drain, but exhausts emergency stores.', my: 'လျှပ်စစ်မကုန်ဘဲ ရေ ၁၅ ယူနစ် ရမည်။ သို့သော် အရံရေကုန်သွားမည်။' },
                    effects: { water: 15, power: 0, morale: -2 }
                },
                {
                    id: 'ration_water',
                    name: { en: 'Enforce Strict Water Rationing Protocol', my: 'တင်းကျပ်သော ရေချွေတာရေး စနစ်ကို ကျင့်သုံးမည်' },
                    desc: { en: 'Saves 10 Water, but drops Crew Health (-8) and Morale (-12).', my: 'ရေ ၁၀ ယူနစ် ချွေတာနိုင်မည်၊ သို့သော် ယာဉ်မှူးများ ရေဓာတ်ခမ်းခြောက်မည်။' },
                    effects: { water: 10, health: -8, morale: -12 }
                }
            ]
        },
        {
            shiftNumber: 3,
            title: { en: 'Shift 3: Coronal Mass Ejection (Solar Storm Alert)', my: 'အလှည့် ၃: ပြင်းထန်သော နေရောင်ခြည်မုန်တိုင်း ရောက်ရှိလာခြင်း' },
            desc: {
                en: 'Deep-space sensors detect a Class X Solar Proton Flare heading directly toward the outpost! Radiation levels will spike dangerously within hours.',
                my: 'ပြင်းထန်သော နေရောင်ခြည် အမှုန်မုန်တိုင်းကြီး စခန်းဆီသို့ ဦးတည်လာနေသဖြင့် ပြင်းထန်သော ရောင်ခြည်ဖြာထွက်မှုဒဏ်ကို ခံရတော့မည်ဖြစ်ပါသည်!'
            },
            nasaScience: {
                title: { en: 'NASA Space Radiation & Regolith Shielding', my: 'NASA အာကာသ ရောင်ခြည်နှင့် အကာအရံများ' },
                text: { 
                    en: 'Beyond Earth\'s magnetosphere, galactic cosmic rays and solar particle events cause acute radiation sickness. NASA researchers plan to pile 2-3 meters of lunar regolith (soil) over habitats to absorb deadly gamma and neutron rays.',
                    my: 'ကမ္ဘာ့သံလိုက်စက်ကွင်း အပြင်ဘက်တွင် အာကာသရောင်ခြည်များသည် အလွန်အန္တရာယ်များပါသည်။ ထို့ကြောင့် NASA သည် လကမ္ဘာမြေသား (Regolith) ကို ၂ မီတာမှ ၃ မီတာအထိ စခန်းပေါ်တွင် အုပ်မိုးကာ ရောင်ခြည်ကာကွယ်ရန် စီစဉ်ထားပါသည်။'
                },
                link: 'https://www.nasa.gov/hrp/hazard-space-radiation/'
            },
            choices: [
                {
                    id: 'bunker_shelter',
                    name: { en: 'Order Immediate Bunker Lockdown in Storm Shelter', my: 'ယာဉ်မှူးအားလုံး မုန်တိုင်းကာကွယ်ရေး အခန်းထဲသို့ ချက်ချင်းဝင်ရောက်ခိုလှုံမည်' },
                    desc: { en: 'Crew Health protected 100%. Science research is halted (Science +0). Consumes 10 Power for life support shielding.', my: 'ယာဉ်မှူးများ ၁၀၀% ဘေးကင်းမည်။ သုတေသန ခဏရပ်နားမည်။ လျှပ်စစ် ၁၀ ယူနစ် ကုန်မည်။' },
                    effects: { health: 0, power: -10, shield: 10, morale: 5 }
                },
                {
                    id: 'overdrive_shield',
                    name: { en: 'Overdrive Electromagnetic Deflector Grid', my: 'လျှပ်စစ်သံလိုက် အကာအကွယ် စနစ်ကို အပြည့်အဝ ဖွင့်မည်' },
                    desc: { en: 'Deflects 85% radiation and keeps research active (+15 Science). Consumes 25 Power!', my: 'ရောင်ခြည် ၈၅% ကာကွယ်ပြီး သုတေသန ဆက်လုပ်နိုင်မည် (+15 Science)။ လျှပ်စစ် ၂၅ ယူနစ် ကုန်မည်!' },
                    effects: { power: -25, science: 15, health: -3, shield: -15 }
                },
                {
                    id: 'brave_storm',
                    name: { en: 'Continue Normal Operations on Outpost Floor', my: 'ပုံမှန်လုပ်ငန်းများကို ဆက်လက်လုပ်ဆောင်မည်' },
                    desc: { en: 'No power cost (+25 Science), but severe radiation dosage damages Crew Health (-22) & Morale (-20)!', my: 'လျှပ်စစ်မကုန်ဘဲ သုတေသနရမည်၊ သို့သော် ရောင်ခြည်ထိသဖြင့် ယာဉ်မှူးကျန်းမာရေး အကြီးအကျယ် ထိခိုက်မည် (-22)။' },
                    effects: { health: -22, morale: -20, science: 25, power: 0 }
                }
            ]
        },
        {
            shiftNumber: 4,
            title: { en: 'Shift 4: Hydroponic Crop Nutrient Depletion', my: 'အလှည့် ၄: စိုက်ပျိုးရေး ဖန်လုံအိမ် အာဟာရဓာတ် လျော့ကျခြင်း' },
            desc: {
                en: 'Greenhouse biological monitors show nitrogen and potassium deficiencies in the hydroponic trays. Space lettuce and microgreens are yellowing!',
                my: 'ရေပေါ်စိုက်ခင်းများတွင် အာဟာရဓာတ် ချို့တဲ့လာသဖြင့် ဟင်းသီးဟင်းရွက်ပင်များ ဝါထိန်ကာ ပျက်စီးနိုင်ခြေ ရှိနေပါသည်!'
            },
            nasaScience: {
                title: { en: 'NASA Space Crops & Veggie System', my: 'NASA အာကာသ စိုက်ပျိုးရေးနှင့် Veggie စနစ်' },
                text: { 
                    en: 'NASA\'s Veggie and Advanced Plant Habitat (APH) on the ISS test how plants grow in microgravity and high CO₂. Fresh greens provide vital micronutrients like potassium, vitamin C, and boost astronaut psychological morale.',
                    my: 'NASA ၏ Veggie သုတေသနတွင် အာကာသထဲ၌ အပင်များ မည်သို့ကြီးထွားသည်ကို စမ်းသပ်လျက်ရှိပါသည်။ လတ်ဆတ်သော ဟင်းသီးဟင်းရွက်များသည် ဗီတာမင်စီနှင့် အာဟာရများ ပေးစွမ်းနိုင်သည့်အပြင် ယာဉ်မှူးများ၏ စိတ်ပျော်ရွှင်မှုကိုလည်း မြှင့်တင်ပေးပါသည်။'
                },
                link: 'https://science.nasa.gov/biological-physical/space-crops/'
            },
            choices: [
                {
                    id: 'enrich_nutrients',
                    name: { en: 'Inject Bio-Nutrient Salts & UV Spectrum Boost', my: 'ဇီဝအာဟာရရည် ထိုးသွင်းပြီး ခရမ်းလွန်ရောင်ခြည် အလင်းပေးမည်' },
                    desc: { en: 'Harvest blooms! Food yield increases (+22 Food). Consumes 14 Power and 10 Water.', my: 'သီးနှံများ အလွန်ကောင်းမွန်စွာ ထွက်ရှိမည် (+22 Food)။ လျှပ်စစ် ၁၄ နှင့် ရေ ၁၀ ကုန်မည်။' },
                    effects: { food: 22, power: -14, water: -10, morale: 8 }
                },
                {
                    id: 'recycle_compost',
                    name: { en: 'Compost Organic Waste Residue', my: 'အော်ဂဲနစ် စွန့်ပစ်ပစ္စည်းများဖြင့် မြေဆွေးပြုလုပ်မည်' },
                    desc: { en: 'Moderate crop recovery (+12 Food). Consumes only 5 Power, saves water.', my: 'အစားအစာ ၁၂ ယူနစ် တိုးမည်။ လျှပ်စစ် ၅ သာကုန်ပြီး ရေချွေတာနိုင်သည်။' },
                    effects: { food: 12, power: -5, water: -3, morale: 3 }
                },
                {
                    id: 'freeze_farm',
                    name: { en: 'Temporarily Dormantise the Greenhouse', my: 'ဖန်လုံအိမ်ကို ခေတ္တ ပိတ်ထားမည်' },
                    desc: { en: 'Saves 15 Power and 8 Water, but zero fresh food produced (-5 Crew Morale).', my: 'လျှပ်စစ် ၁၅ နှင့် ရေ ၈ ချွေတာနိုင်မည်၊ သို့သော် လတ်ဆတ်သော အစားအစာ မရနိုင်ပါ။' },
                    effects: { power: 15, water: 8, food: -5, morale: -5 }
                }
            ]
        },
        {
            shiftNumber: 5,
            title: { en: 'Shift 5: The Extreme Survival Trial (Eclipse / Storm)', my: 'အလှည့် ၅: အပြင်းထန်ဆုံး စိန်ခေါ်မှု (အမှောင်ထု / ဖုန်မုန်တိုင်းကြီး)' },
            desc: {
                en: 'A massive planetary occultation blankets the outpost in total darkness. Temperatures plunge to -180°C and solar panels generate 0 Power for the entire shift!',
                my: 'အလွန်ပြင်းထန်သော အမှောင်ထုကြီး ကျရောက်လာသဖြင့် အပူချိန်သည် အနှုတ် ၁၈၀ ဒီဂရီထိ အေးခဲသွားပြီး ဆိုလာပြားများမှ လျှပ်စစ်လုံးဝ မရတော့ပါ!'
            },
            nasaScience: {
                title: { en: 'NASA Artemis Lunar Night Survival & Fission Power', my: 'NASA Artemis လကမ္ဘာညဉ့်ရှင်သန်ရေးနှင့် နျူကလီးယားစွမ်းအင်' },
                text: { 
                    en: 'Surviving the 14-day lunar night is one of the toughest challenges for NASA\'s Artemis base camp. NASA is developing 40-kilowatt Fission Surface Power systems and regenerative fuel cells to provide uninterrupted warmth and electricity.',
                    my: '၁၄ ရက်ကြာ လကမ္ဘာညဉ့်ကို ကျော်ဖြတ်ရန် NASA သည် ၄၀ ကီလိုဝပ် နျူကလီးယားစွမ်းအင်သုံး လျှပ်စစ်စနစ်များကို တီထွင်နေပြီး စခန်းအား အမြဲတမ်းနွေးထွေးကာ လည်ပတ်နိုင်အောင် စီမံလျက်ရှိပါသည်။'
                },
                link: 'https://www.nasa.gov/centers-and-facilities/glenn/fission-surface-power/'
            },
            choices: [
                {
                    id: 'emergency_power_triage',
                    name: { en: 'Activate Critical Life-Support Priority Triage', my: 'အသက်ကယ်စနစ်ကိုသာ ဦးစားပေးဖွင့်ပြီး ကျန်စနစ်များ ပိတ်မည်' },
                    desc: { en: 'Diverts all stored battery power to thermal heaters & oxygen. Crew survives comfortably (Health +5). Consumes 28 Power.', my: 'အပူပေးစက်နှင့် အောက်ဆီဂျင်ကိုသာ ဦးစားပေးမည်။ ယာဉ်မှူးများ ဘေးကင်းမည်။ လျှပ်စစ် ၂၈ ကုန်မည်။' },
                    effects: { power: -28, oxygen: 10, health: 5, morale: 5, science: 10 }
                },
                {
                    id: 'science_push',
                    name: { en: 'Utilize Backup Reserves for Deep-Space Astronomy', my: 'အရံစွမ်းအင်ဖြင့် အာကာသ နက္ခတ်သုတေသန ပြုလုပ်မည်' },
                    desc: { en: 'Major scientific breakthrough (+35 Science)! High strain on heaters leaves crew chilly (Health -10, Power -35).', my: 'အဓိက သိပ္ပံအောင်မြင်မှုရမည် (+35 Science)၊ သို့သော် အအေးဒဏ်ကြောင့် ယာဉ်မှူးကျန်းမာရေး ထိခိုက်မည် (-10)။' },
                    effects: { science: 35, power: -35, health: -10, morale: -5 }
                },
                {
                    id: 'cryo_hibernate',
                    name: { en: 'Enter Low-Power Crew Rest Hibernation Mode', my: 'ယာဉ်မှူးများ အနားယူအိပ်စက်သည့် စွမ်းအင်ချွေတာရေး စနစ်သုံးမည်' },
                    desc: { en: 'Minimizes power and oxygen draw (Consumes only 12 Power, 5 Oxygen). Safe and conservative.', my: 'လျှပ်စစ် ၁၂ နှင့် အောက်ဆီဂျင် ၅ သာ ကုန်ကျသဖြင့် အလွန်ဘေးကင်းသော နည်းလမ်းဖြစ်ပါသည်။' },
                    effects: { power: -12, oxygen: -5, health: 0, morale: 0 }
                }
            ]
        }
    ]
};

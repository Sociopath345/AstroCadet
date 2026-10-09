// Language Dictionary (English & Burmese)
window.LANG = {
    current: 'en', // 'en' or 'my'

    get(key, fallback = '') {
        const entry = this.dict[key];
        if (!entry) return fallback || key;
        return entry[this.current] || entry['en'] || fallback || key;
    },

    setLang(lang) {
        if (lang === 'en' || lang === 'my') {
            this.current = lang;
            document.documentElement.lang = lang;
            if (window.updateUITranslations) {
                window.updateUITranslations();
            }
        }
    },

    dict: {
        app_title: {
            en: 'AstroCadet: Junior Astronaut Mission Trainer',
            my: 'AstroCadet: ဂျူနီယာ အာကာသယာဉ်မှူး မစ်ရှင် သင်တန်း'
        },
        app_subtitle: {
            en: 'NASA Space Apps Challenge — Outpost Command & Resource Management Simulator',
            my: 'NASA Space Apps Challenge — အာကာသစခန်း စီမံခန့်ခွဲမှုနှင့် အသက်ရှင်သန်ရေး သရုပ်ပြဂိမ်း'
        },
        btn_start_briefing: {
            en: 'ENTER MISSION CONTROL',
            my: 'မစ်ရှင်ကွပ်ကဲရေးစခန်းသို့ ဝင်မည်'
        },
        btn_select_dest: {
            en: 'SELECT DESTINATION',
            my: 'သွားမည့်ဂြိုဟ် ရွေးချယ်မည်'
        },
        btn_proceed_payload: {
            en: 'CONFIGURE PAYLOAD & ROCKET',
            my: 'ပစ္စည်းနှင့် ဒုံးပျံ ပြင်ဆင်မည်'
        },
        btn_launch: {
            en: 'LAUNCH MISSION',
            my: 'ဒုံးပျံစတင်လွှတ်တင်မည်'
        },
        btn_next_shift: {
            en: 'RUN NEXT MISSION SHIFT',
            my: 'နောက်ထပ် မစ်ရှင်အလှည့်သို့ သွားမည်'
        },
        btn_play_again: {
            en: 'TRAIN AGAIN / NEW MISSION',
            my: 'မစ်ရှင်အသစ် ပြန်လည်လေ့ကျင့်မည်'
        },
        btn_learn_more: {
            en: 'NASA Science Insight',
            my: 'NASA သိပ္ပံဆိုင်ရာ ရှင်းလင်းချက်'
        },

        // Destinations
        dest_moon_title: { en: 'LUNA BASE (THE MOON)', my: 'လကမ္ဘာ အခြေစိုက်စခန်း' },
        dest_moon_desc: { 
            en: 'Earth\'s closest neighbor. High solar flux during day, but requires surviving intense radiation, fine lunar dust, and a 14-day freezing lunar night.',
            my: 'ကမ္ဘာနှင့် အနီးဆုံးနေရာ။ နေ့ဘက်တွင် နေရောင်ခြည်ကောင်းစွာရသော်လည်း ပြင်းထန်သော ရောင်ခြည်ဖြာထွက်မှု၊ လမျက်နှာပြင်ဖုန်မှုန့်နှင့် ၁၄ ရက်ကြာ အေးခဲသောအမှောင်ထုကို ကျော်ဖြတ်ရပါမည်။'
        },
        dest_moon_mass: { en: 'Weight Limit: 8,000 kg', my: 'သယ်ဆောင်နိုင်သည့် အလေးချိန်: 8,000 kg' },

        dest_mars_title: { en: 'ARES OUTPOST (MARS)', my: 'အင်္ဂါဂြိုဟ် အခြေစိုက်စခန်း' },
        dest_mars_desc: { 
            en: 'The Red Planet. Longer transit, lower solar energy, atmospheric dust storms that can obscure arrays for weeks, and critical reliance on closed-loop water recovery.',
            my: 'အနီရောင်ဂြိုဟ်။ ခရီးဝေး၊ နေရောင်ခြည်စွမ်းအင်နည်း၊ ရက်သတ္တပတ်ပေါင်းများစွာ နေရောင်ကိုဖုံးလွှမ်းနိုင်သော ဖုန်မုန်တိုင်းများနှင့် ရေပြန်လည်သန့်စင်သုံးစွဲမှု အလွန်အရေးကြီးသည်။'
        },
        dest_mars_mass: { en: 'Weight Limit: 12,000 kg', my: 'သယ်ဆောင်နိုင်သည့် အလေးချိန်: 12,000 kg' },

        // Categories
        cat_engine: { en: 'Rocket Engine', my: 'ဒုံးပျံအင်ဂျင်' },
        cat_fuel: { en: 'Fuel Capacity', my: 'လောင်စာဆီ' },
        cat_capsule: { en: 'Crew Habitat', my: 'အာကာသယာဉ်မှူး အခန်း' },
        cat_life_support: { en: 'Life Support (ECLSS)', my: 'အသက်ကယ်စနစ် (ECLSS)' },
        cat_food: { en: 'Food & Crops', my: 'အစားအစာနှင့် စိုက်ပျိုးရေး' },
        cat_power: { en: 'Power Systems', my: 'စွမ်းအင်စနစ်' },
        cat_landing: { en: 'Landing & Shielding', my: 'ဆင်းသက်မှုနှင့် အကာအကွယ်' },
        cat_exploration: { en: 'Exploration & Science', my: 'စူးစမ်းလေ့လာရေးနှင့် သိပ္ပံ' },

        // Resources
        res_power: { en: 'Power Grid', my: 'လျှပ်စစ်စွမ်းအင်' },
        res_oxygen: { en: 'Oxygen (O₂)', my: 'အောက်ဆီဂျင်' },
        res_water: { en: 'Water Reserves', my: 'ရေသန့်ပမာဏ' },
        res_food: { en: 'Food Supply', my: 'အစားအစာ' },
        res_shield: { en: 'Shield Integrity', my: 'ရောင်ခြည်ကာကွယ်မှု' },
        res_health: { en: 'Crew Health', my: 'ယာဉ်မှူးကျန်းမာရေး' },

        // Outpost Rooms
        room_power: { en: 'Power Core & Arrays', my: 'စွမ်းအင်နှင့် ဆိုလာစနစ်' },
        room_life: { en: 'ECLSS Atmosphere Hub', my: 'အသက်ကယ် လေထုစနစ်' },
        room_farm: { en: 'Hydroponic Greenhouse', my: 'ရေပေါ်စိုက်ပျိုးရေး ဖန်လုံအိမ်' },
        room_water: { en: 'Water Filtration Unit', my: 'ရေပြန်လည်သန့်စင်စက်' },
        room_shelter: { en: 'Regolith Storm Shelter', my: 'မုန်တိုင်းကာကွယ်ရေး အကာအရံ' },
        room_science: { en: 'Science Research Lab', my: 'သိပ္ပံသုတေသန ဓာတ်ခွဲခန်း' },

        // Hints
        hint_mass_exceeded: {
            en: '⚠️ WARNING: Payload mass exceeds destination limit! Lighten equipment.',
            my: '⚠️ သတိပေးချက်: သယ်ဆောင်သည့် အလေးချိန် ကန့်သတ်ချက်ထက် ကျော်လွန်နေပါသည်!'
        },
        hint_requirements_missing: {
            en: 'Missing mandatory mission modules for selected destination.',
            my: 'ရွေးချယ်ထားသော မစ်ရှင်အတွက် မဖြစ်မနေလိုအပ်သော ပစ္စည်းများ မပြည့်စုံသေးပါ။'
        },
        hint_ready_to_launch: {
            en: '✅ All systems nominal! Rocket payload validated. Ready for liftoff.',
            my: '✅ စနစ်အားလုံး အဆင်သင့်ဖြစ်ပါပြီ! ဒုံးပျံကို လွှတ်တင်နိုင်ပါပြီ။'
        },

        // Status messages
        msg_shift: { en: 'Mission Shift', my: 'မစ်ရှင် အလှည့်' },
        msg_score: { en: 'Mission Score', my: 'မစ်ရှင် ရမှတ်' },
        msg_crew_safe: { en: 'Astronauts on Duty: 6 Active Specialists', my: 'တာဝန်ကျ ယာဉ်မှူးများ: ၆ ဦး လှုပ်ရှားလျက်' },

        // Astronaut Dossier
        crew_dossier_title: { en: 'ASTRONAUT DOSSIER', my: 'ယာဉ်မှူး ကိုယ်ရေးအချက်အလက်' },
        crew_inspect_hint: { en: 'Click any astronaut to inspect achievements & stats', my: 'ယာဉ်မှူးကို နှိပ်၍ အချက်အလက်နှင့် အောင်မြင်မှုများကို ကြည့်ပါ' },
        crew_trait_label: { en: 'MISSION TRAIT & PASSIVE BONUS:', my: 'မစ်ရှင် အထူးစွမ်းဆောင်ရည်:' },
        crew_achievements_label: { en: 'COOL ACHIEVEMENTS & SPACE RECORDS:', my: 'ထူးချွန်သော အာကာသ စံချိန်တင် အောင်မြင်မှုများ:' },

        // Outcome titles
        outcome_success: {
            en: '⭐ MISSION ACCOMPLISHED: EXEMPLAR COMMANDER!',
            my: '⭐ မစ်ရှင်အောင်မြင်သည်: စံပြ မစ်ရှင်ကွပ်ကဲရေးမှူး!'
        },
        outcome_survived: {
            en: '✅ CREW SURVIVED: OUTPOST STABILIZED',
            my: '✅ ယာဉ်မှူး ၆ ဦးလုံး ဘေးကင်းစွာ ရှင်သန်နိုင်ခဲ့သည်'
        },
        outcome_evac: {
            en: '⚠️ CRITICAL EMERGENCY: BASE EVACUATION ORDERED',
            my: '⚠️ အရေးပေါ်အခြေအနေ: စခန်းမှ အရေးပေါ် ကယ်ထုတ်ခဲ့ရသည်'
        }
    }
};

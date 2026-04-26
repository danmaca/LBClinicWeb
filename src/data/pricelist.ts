export const pricelist = {
  categories: [
    {
      name: {
        cs: "Prevence a vyšetření",
        en: "Prevention and Examination",
        ru: "Профилактика и обследование",
        uk: "Профілактика та обстеження",
      },
      items: [
        {
          name: {
            cs: "Vstupní prohlídka pro registrované pacienty",
            en: "Initial examination for registered patients",
            ru: "Первичный осмотр для зарегистрированных пациентов",
            uk: "Первинний огляд для зареєстрованих пацієнтів",
          },
          price: {
            cs: "hradí ZP",
            en: "covered by insurance",
            ru: "оплачивается страховой",
            uk: "оплачується страховою",
          },
        },
        {
          name: {
            cs: "Preventivní prohlídka s RTG",
            en: "Preventive check-up with X-ray",
            ru: "Профилактический осмотр с рентгеном",
            uk: "Профілактичний огляд з рентгеном",
          },
          price: {
            cs: "hradí ZP",
            en: "covered by insurance",
            ru: "оплачивается страховой",
            uk: "оплачується страховою",
          },
        },
        {
          name: {
            cs: "Panoramatický rentgenový snímek",
            en: "Panoramic X-ray",
            ru: "Панорамный рентгеновский снимок",
            uk: "Панорамний рентгенівський знімок",
          },
          price: {
            cs: "hradí ZP 1x za 2 roky",
            en: "covered by insurance once every 2 years",
            ru: "оплачивается страховой 1 раз в 2 года",
            uk: "оплачується страховою 1 раз на 2 роки",
          },
        },
      ],
    },
    {
      name: {
        cs: "Dentální hygiena",
        en: "Dental Hygiene",
        ru: "Гигиена полости рта",
        uk: "Гігієна порожнини рота",
      },
      items: [
        {
          name: {
            cs: "Dentální hygiena 60 min vstupní",
            en: "Dental hygiene 60 min — initial visit",
            ru: "Гигиена полости рта 60 мин — первичная",
            uk: "Гігієна порожнини рота 60 хв — первинна",
          },
          price: 2100,
        },
        {
          name: {
            cs: "Dentální hygiena 60 min recall",
            en: "Dental hygiene 60 min — recall visit",
            ru: "Гигиена полости рта 60 мин — повторная",
            uk: "Гігієна порожнини рота 60 хв — повторна",
          },
          price: 2000,
        },
        {
          name: {
            cs: "Dentální hygiena děti do 12 let, 30 min",
            en: "Dental hygiene for children up to 12 years, 30 min",
            ru: "Гигиена полости рта для детей до 12 лет, 30 мин",
            uk: "Гігієна порожнини рота для дітей до 12 років, 30 хв",
          },
          price: 1100,
        },
        {
          name: {
            cs: "Dentální hygiena u dětí se stálým chrupem",
            en: "Dental hygiene for children with permanent teeth",
            ru: "Гигиена полости рта у детей с постоянными зубами",
            uk: "Гігієна порожнини рота у дітей з постійними зубами",
          },
          price: 1490,
        },
        {
          name: {
            cs: "Dentální hygiena u dětí s fixními rovnátky",
            en: "Dental hygiene for children with fixed braces",
            ru: "Гигиена полости рта у детей с несъёмными брекетами",
            uk: "Гігієна порожнини рота у дітей з незнімними брекетами",
          },
          price: 1590,
        },
        {
          name: {
            cs: "Deep scaling / hloubkové čistění parodontálních kapes, odstranění poddásňového kamene",
            en: "Deep scaling / deep cleaning of periodontal pockets, subgingival tartar removal",
            ru: "Глубокий скейлинг / глубокая чистка пародонтальных карманов, удаление поддесневого камня",
            uk: "Глибокий скейлінг / глибоке чищення пародонтальних кишень, видалення піддесневого каменю",
          },
          price: {
            cs: "od 2 800 až 3 250 Kč",
            en: "from 2,800 to 3,250 CZK",
            ru: "от 2 800 до 3 250 Kč",
            uk: "від 2 800 до 3 250 Kč",
          },
        },
      ],
    },
    {
      name: {
        cs: "Bělení zubů",
        en: "Teeth Whitening",
        ru: "Отбеливание зубов",
        uk: "Відбілювання зубів",
      },
      items: [
        {
          name: {
            cs: "Domácí bělení Opalescence 10 % nebo 16% (v ceně gely, nosiče obě čelisti, instruktáž)",
            en: "Home whitening Opalescence 10% or 16% (gels, trays for both jaws, and instructions included)",
            ru: "Домашнее отбеливание Opalescence 10% или 16% (в стоимость входят гели, каппы на обе челюсти, инструктаж)",
            uk: "Домашнє відбілювання Opalescence 10% або 16% (у вартість входять гелі, капи на обидві щелепи, інструктаж)",
          },
          price: 8000,
        },
      ],
    },
    {
      name: {
        cs: "Extrakce osmiček, trhání zubu",
        en: "Wisdom Teeth Extraction",
        ru: "Удаление зубов мудрости",
        uk: "Видалення зубів мудрості",
      },
      items: [
        {
          name: {
            cs: "Jednoduchá extrakce dočasného i stálého zubu",
            en: "Simple extraction of a deciduous or permanent tooth",
            ru: "Простое удаление молочного или постоянного зуба",
            uk: "Просте видалення молочного або постійного зуба",
          },
          price: {
            cs: "provádíme za úhradu ZP",
            en: "performed with insurance coverage",
            ru: "выполняется за счёт страховой",
            uk: "виконується за рахунок страхової",
          },
        },
        {
          name: {
            cs: "Komplikovaná chirurgická extrakce",
            en: "Complicated surgical extraction",
            ru: "Сложное хирургическое удаление",
            uk: "Складне хірургічне видалення",
          },
          price: {
            cs: "od 2 500 Kč",
            en: "from 2,500 CZK",
            ru: "от 2 500 Kč",
            uk: "від 2 500 Kč",
          },
        },
        {
          name: {
            cs: "Řízená tkáňová regenerace",
            en: "Guided tissue regeneration",
            ru: "Направленная тканевая регенерация",
            uk: "Керована тканинна регенерація",
          },
          price: 1200,
        },
        {
          name: {
            cs: "Krytí odhalených krčků - chirurgické krytí obnažených kořenů 1 zub",
            en: "Gum recession coverage — surgical root coverage per tooth",
            ru: "Закрытие оголённых шеек — хирургическое закрытие обнажённых корней, 1 зуб",
            uk: "Закриття оголених шийок — хірургічне закриття оголених коренів, 1 зуб",
          },
          price: {
            cs: "od 5 000 Kč",
            en: "from 5,000 CZK",
            ru: "от 5 000 Kč",
            uk: "від 5 000 Kč",
          },
        },
      ],
    },
    {
      name: {
        cs: "Bílé fotokompozitní výplně",
        en: "White Composite Fillings",
        ru: "Белые фотокомпозитные пломбы",
        uk: "Білі фотокомпозитні пломби",
      },
      items: [
        {
          name: {
            cs: "Výplň dočasného - mléčného - zubu fotokompozitem",
            en: "Composite filling of a deciduous (baby) tooth",
            ru: "Пломбирование молочного зуба фотокомпозитом",
            uk: "Пломбування молочного зуба фотокомпозитом",
          },
          price: {
            cs: "od 1 000 až 2 000 Kč",
            en: "from 1,000 to 2,000 CZK",
            ru: "от 1 000 до 2 000 Kč",
            uk: "від 1 000 до 2 000 Kč",
          },
        },
        {
          name: {
            cs: "Výplň fotokompozitní krček zubu",
            en: "Composite filling — tooth cervical area",
            ru: "Фотокомпозитная пломба — шейка зуба",
            uk: "Фотокомпозитна пломба — шийка зуба",
          },
          price: {
            cs: "od 2 600 Kč",
            en: "from 2,600 CZK",
            ru: "от 2 600 Kč",
            uk: "від 2 600 Kč",
          },
        },
        {
          name: {
            cs: "Fotokompozitní výplň 1 ploška",
            en: "Composite filling — 1 surface",
            ru: "Фотокомпозитная пломба — 1 поверхность",
            uk: "Фотокомпозитна пломба — 1 поверхня",
          },
          price: {
            cs: "od 2 500 Kč",
            en: "from 2,500 CZK",
            ru: "от 2 500 Kč",
            uk: "від 2 500 Kč",
          },
        },
        {
          name: {
            cs: "Fotokompozitní výplň 2 plošky",
            en: "Composite filling — 2 surfaces",
            ru: "Фотокомпозитная пломба — 2 поверхности",
            uk: "Фотокомпозитна пломба — 2 поверхні",
          },
          price: {
            cs: "od 3 500 Kč",
            en: "from 3,500 CZK",
            ru: "от 3 500 Kč",
            uk: "від 3 500 Kč",
          },
        },
        {
          name: {
            cs: "Fotokompozitní výplň 3 plošky",
            en: "Composite filling — 3 surfaces",
            ru: "Фотокомпозитная пломба — 3 поверхности",
            uk: "Фотокомпозитна пломба — 3 поверхні",
          },
          price: {
            cs: "od 3 900 až 5 000 Kč",
            en: "from 3,900 to 5,000 CZK",
            ru: "от 3 900 до 5 000 Kč",
            uk: "від 3 900 до 5 000 Kč",
          },
        },
        {
          name: {
            cs: "Estetická fotokompozitní rekonstrukce předních zubů / dostavby po úrazech dle náročnosti",
            en: "Aesthetic composite reconstruction of front teeth / post-injury restorations, depending on complexity",
            ru: "Эстетическая фотокомпозитная реконструкция передних зубов / восстановление после травм, в зависимости от сложности",
            uk: "Естетична фотокомпозитна реконструкція передніх зубів / відновлення після травм, залежно від складності",
          },
          price: {
            cs: "od 4 500 až 7 500 Kč",
            en: "from 4,500 to 7,500 CZK",
            ru: "от 4 500 до 7 500 Kč",
            uk: "від 4 500 до 7 500 Kč",
          },
        },
      ],
    },
    {
      name: {
        cs: "Endodoncie - ošetření kořenových kanálků",
        en: "Endodontics — Root Canal Treatment",
        ru: "Эндодонтия — лечение корневых каналов",
        uk: "Ендодонтія — лікування кореневих каналів",
      },
      items: [
        {
          name: {
            cs: "Ošetření kořenových kanálků pod mikroskopem",
            en: "Root canal treatment under microscope",
            ru: "Лечение корневых каналов под микроскопом",
            uk: "Лікування кореневих каналів під мікроскопом",
          },
          price: {
            cs: "od 8 000 až 16 000 Kč dle počtu kanálků",
            en: "from 8,000 to 16,000 CZK depending on the number of canals",
            ru: "от 8 000 до 16 000 Kč в зависимости от количества каналов",
            uk: "від 8 000 до 16 000 Kč залежно від кількості каналів",
          },
        },
      ],
    },
    {
      name: {
        cs: "Dětská stomatologie",
        en: "Pediatric Dentistry",
        ru: "Детская стоматология",
        uk: "Дитяча стоматологія",
      },
      items: [
        {
          name: {
            cs: "Fotokompozitní výplň dočasného zubu",
            en: "Composite filling of a deciduous tooth",
            ru: "Фотокомпозитная пломба молочного зуба",
            uk: "Фотокомпозитна пломба молочного зуба",
          },
          price: {
            cs: "od 1 000 do 2 000 Kč",
            en: "from 1,000 to 2,000 CZK",
            ru: "от 1 000 до 2 000 Kč",
            uk: "від 1 000 до 2 000 Kč",
          },
        },
        {
          name: {
            cs: "Extrakce mléčného zubu",
            en: "Deciduous tooth extraction",
            ru: "Удаление молочного зуба",
            uk: "Видалення молочного зуба",
          },
          price: {
            cs: "provádíme za úhradu ZP",
            en: "performed with insurance coverage",
            ru: "выполняется за счёт страховой",
            uk: "виконується за рахунок страхової",
          },
        },
        {
          name: {
            cs: "Odstranění podjazykové uzdičky",
            en: "Sublingual frenectomy",
            ru: "Удаление подъязычной уздечки",
            uk: "Видалення під'язикової вуздечки",
          },
          price: 3200,
        },
        {
          name: {
            cs: "Mezerník nebo prefabrikovaná kovová korunka",
            en: "Space maintainer or prefabricated metal crown",
            ru: "Удерживатель пространства или сборная металлическая коронка",
            uk: "Утримувач простору або збірна металева коронка",
          },
          price: {
            cs: "od 3 000 Kč",
            en: "from 3,000 CZK",
            ru: "от 3 000 Kč",
            uk: "від 3 000 Kč",
          },
        },
        {
          name: {
            cs: "Endodoncie dočasného zubu",
            en: "Endodontic treatment of a deciduous tooth",
            ru: "Эндодонтическое лечение молочного зуба",
            uk: "Ендодонтичне лікування молочного зуба",
          },
          price: 3000,
        },
        {
          name: {
            cs: "Sedace při vědomí Entonox / Midazolam",
            en: "Conscious sedation with Entonox / Midazolam",
            ru: "Седация в сознании Entonox / Midazolam",
            uk: "Седація при свідомості Entonox / Midazolam",
          },
          price: {
            cs: "od 2 500 Kč + cena výkonu",
            en: "from 2,500 CZK + procedure cost",
            ru: "от 2 500 Kč + стоимость процедуры",
            uk: "від 2 500 Kč + вартість процедури",
          },
        },
        {
          name: {
            cs: "Ošetření v celkové anestezii",
            en: "Treatment under general anesthesia",
            ru: "Лечение под общим наркозом",
            uk: "Лікування під загальним наркозом",
          },
          price: {
            cs: "cena dle individuální konzultace",
            en: "price upon individual consultation",
            ru: "цена по результатам индивидуальной консультации",
            uk: "ціна за результатами індивідуальної консультації",
          },
        },
      ],
    },
    {
      name: {
        cs: "Korunky, můstky, fazety",
        en: "Crowns, Bridges, Veneers",
        ru: "Коронки, мосты, виниры",
        uk: "Коронки, мости, вініри",
      },
      items: [
        {
          name: {
            cs: "Korunka keramická zirkon/E-max",
            en: "Zirconia/E-max ceramic crown",
            ru: "Циркониевая/E-max керамическая коронка",
            uk: "Цирконієва/E-max керамічна коронка",
          },
          price: 14000,
        },
        {
          name: {
            cs: "Korunka provizorní frézovaná",
            en: "Milled provisional crown",
            ru: "Фрезерованная временная коронка",
            uk: "Фрезерована тимчасова коронка",
          },
          price: 4000,
        },
        {
          name: {
            cs: "Můstek keramický zirkon",
            en: "Zirconia ceramic bridge",
            ru: "Циркониевый керамический мост",
            uk: "Цирконієвий керамічний міст",
          },
          price: {
            cs: "od 35 000 Kč",
            en: "from 35,000 CZK",
            ru: "от 35 000 Kč",
            uk: "від 35 000 Kč",
          },
        },
        {
          name: {
            cs: "Fazeta",
            en: "Veneer",
            ru: "Винир",
            uk: "Вінір",
          },
          price: {
            cs: "od 12 000 Kč",
            en: "from 12,000 CZK",
            ru: "от 12 000 Kč",
            uk: "від 12 000 Kč",
          },
        },
        {
          name: {
            cs: "Fotokompozitní overlay",
            en: "Composite overlay",
            ru: "Фотокомпозитный оверлей",
            uk: "Фотокомпозитний оверлей",
          },
          price: 12000,
        },
        {
          name: {
            cs: "Keramická overlay",
            en: "Ceramic overlay",
            ru: "Керамический оверлей",
            uk: "Керамічний оверлей",
          },
          price: 14000,
        },
      ],
    },
    {
      name: {
        cs: "Snímatelné náhrady (protézy)",
        en: "Removable Dentures (Prostheses)",
        ru: "Съёмные протезы",
        uk: "Знімні протези",
      },
      items: [
        {
          name: {
            cs: "Imediátní zubní náhrada",
            en: "Immediate dental prosthesis",
            ru: "Иммедиат-протез",
            uk: "Іммедіат-протез",
          },
          price: 9000,
        },
      ],
    },
    {
      name: {
        cs: "Akutní ošetření",
        en: "Emergency Treatment",
        ru: "Неотложная помощь",
        uk: "Невідкладна допомога",
      },
      items: [
        {
          name: {
            cs: "Akutní ošetření neregistrovaného pacienta",
            en: "Emergency treatment for unregistered patients",
            ru: "Неотложная помощь незарегистрированному пациенту",
            uk: "Невідкладна допомога незареєстрованому пацієнту",
          },
          price: 1500,
        },
      ],
    },
    {
      name: {
        cs: "Konzultace",
        en: "Consultation",
        ru: "Консультация",
        uk: "Консультація",
      },
      items: [
        {
          name: {
            cs: "Konzultace, 15 min",
            en: "Consultation, 15 min",
            ru: "Консультация, 15 мин",
            uk: "Консультація, 15 хв",
          },
          price: 1500,
        },
      ],
    },
  ],
};

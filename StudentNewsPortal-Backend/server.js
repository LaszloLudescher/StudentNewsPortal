const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); 
// JSON kérések feldolgozása
app.use(express.json()); 


let newsData = [
  {
    id: 1,
    image: "/sweat.png",
    translations: {
      ro: {
        title: "Succesul studenților la Olimpiada Națională de Matematică",
        summary: "Echipa universității noastre a obținut locul I la competiția națională.",
        content: "Echipa universității noastre a obținut locul I la Olimpiada Națională de Matematică, demonstrând încă o dată excelența academică a instituției. Studenții au participat la diverse probe complexe, rezolvând probleme avansate de analiză matematică și algebră.\n\nProfesorul coordonator a declarat că acest succes este rezultatul muncii susținute și dedicării echipei. Studenții s-au pregătit intens timp de șase luni, participând la sesiuni suplimentare de studiu și rezolvând sute de probleme practice.\n\nUniversitatea va organiza o ceremonie de premiere săptămâna viitoare pentru a celebra această realizare remarcabilă.",
        date: "12 iunie 2026",
      },
      hu: {
        title: "Diákok sikere az Országos Matematikaolimpián",
        summary: "Egyetemünk csapata első helyet szerzett a nemzeti versenyen.",
        content: "Egyetemünk csapata első helyen végzett az Országos Matematikaolimpián, ezzel ismét bizonyítva intézményünk akadémiai kiválóságát. A hallgatók különböző összetett feladatokban vettek részt, haladó matematikai analízis és algebra problémákat oldva meg.\n\nA koordináló tanár kijelentette, hogy ez a siker a csapat kitartó munkájának és elhivatottságának eredménye. A hallgatók hat hónapon át intenzíven készültek, részt vettünk kiegészítő tanulmányi üléseken és több száz gyakorlati feladatot oldottunk meg.\n\nAz egyetem jövő héten díjátadó ünnepséget szervez e figyelemre méltó eredmény megünneplésére.",
        date: "2026. június 12.",
      },
      en: {
        title: "Students Triumph at the National Mathematics Olympiad",
        summary: "Our university's team secured first place at the national competition.",
        content: "Our university's team claimed first place at the National Mathematics Olympiad, once again demonstrating the institution's academic excellence. Students participated in various complex challenges, solving advanced problems in mathematical analysis and algebra.\n\nThe coordinating professor stated that this success is the result of the team's sustained effort and dedication. Students prepared intensively for six months, attending additional study sessions and solving hundreds of practice problems.\n\nThe university will organize an award ceremony next week to celebrate this remarkable achievement.",
        date: "June 12, 2026",
      },
      de: {
        title: "Studenten triumphieren bei der Nationalen Mathematikolympiade",
        summary: "Das Team unserer Universität belegte den ersten Platz beim nationalen Wettbewerb.",
        content: "Das Team unserer Universität belegte den ersten Platz bei der Nationalen Mathematikolympiade und bewies damit erneut die akademische Exzellenz der Institution. Die Studenten nahmen an verschiedenen komplexen Aufgaben teil und lösten fortgeschrittene Probleme in der mathematischen Analyse und Algebra.\n\nDer koordinierende Professor erklärte, dass dieser Erfolg das Ergebnis des anhaltenden Einsatzes und der Hingabe des Teams sei. Die Studenten bereiteten sich sechs Monate lang intensiv vor, nahmen an zusätzlichen Studiensitzungen teil und lösten Hunderte von Übungsaufgaben.\n\nDie Universität wird nächste Woche eine Preisverleihungszeremonie organisieren, um diese bemerkenswerte Leistung zu feiern.",
        date: "12. Juni 2026",
      },
      fr: {
        title: "Succès des étudiants à l'Olympiade Nationale de Mathématiques",
        summary: "L'équipe de notre université a remporté la première place à la compétition nationale.",
        content: "L'équipe de notre université a décroché la première place à l'Olympiade Nationale de Mathématiques, démontrant une fois de plus l'excellence académique de l'institution. Les étudiants ont participé à diverses épreuves complexes, résolvant des problèmes avancés d'analyse mathématique et d'algèbre.\n\nLe professeur coordinateur a déclaré que ce succès est le fruit du travail acharné et du dévouement de l'équipe. Les étudiants se sont préparés intensément pendant six mois, participant à des sessions d'étude supplémentaires et résolvant des centaines de problèmes pratiques.\n\nL'université organisera une cérémonie de remise des prix la semaine prochaine pour célébrer cette remarquable réussite.",
        date: "12 juin 2026",
      },
    },
  },
  {
    id: 2,
    image: "/sweat.png",
    translations: {
      ro: {
        title: "Noua bibliotecă digitală: acces gratuit la mii de resurse",
        summary: "Universitatea lansează o platformă digitală cu peste 10.000 de cărți și articole.",
        content: "Începând de astăzi, studenții au acces gratuit la noua bibliotecă digitală a universității, care conține peste 10.000 de cărți, articole științifice și resurse educaționale. Platforma este accesibilă 24/7 de pe orice dispozitiv.\n\nColecția include lucrări din toate domeniile de studiu, de la științe exacte până la științe umaniste. Studenții pot descărca materiale, pot face marcaje și pot crea liste personalizate de lectură.\n\nAceastă inițiativă face parte din strategia de digitalizare a universității și vine ca răspuns la solicitările studenților pentru resurse mai accesibile.",
        date: "10 iunie 2026",
      },
      hu: {
        title: "Új digitális könyvtár: ingyenes hozzáférés ezer forráshoz",
        summary: "Az egyetem több mint 10 000 könyvet és cikket tartalmazó digitális platformot indít.",
        content: "Mától a hallgatók ingyenesen hozzáférhetnek az egyetem új digitális könyvtárához, amely több mint 10 000 könyvet, tudományos cikket és oktatási forrást tartalmaz. A platform bármilyen eszközről elérhető a nap 24 órájában.\n\nA gyűjtemény minden tanulmányi területről tartalmaz munkákat, a természettudományoktól a bölcsészettudományokig. A hallgatók letölthetnek anyagokat, könyvjelzőket helyezhetnek el, és személyre szabott olvasási listákat hozhatnak létre.\n\nEz a kezdeményezés az egyetem digitalizációs stratégiájának része, és a hallgatók hozzáférhetőbb erőforrásokra vonatkozó igényeinek kielégítésére reagál.",
        date: "2026. június 10.",
      },
      en: {
        title: "New Digital Library: Free Access to Thousands of Resources",
        summary: "The university launches a digital platform with over 10,000 books and articles.",
        content: "Starting today, students have free access to the university's new digital library, which contains over 10,000 books, scientific articles, and educational resources. The platform is accessible 24/7 from any device.\n\nThe collection includes works from all fields of study, from exact sciences to humanities. Students can download materials, add bookmarks, and create personalized reading lists.\n\nThis initiative is part of the university's digitization strategy and comes in response to students' requests for more accessible resources.",
        date: "June 10, 2026",
      },
      de: {
        title: "Neue Digitalbibliothek: Kostenloser Zugang zu Tausenden von Ressourcen",
        summary: "Die Universität startet eine digitale Plattform mit über 10.000 Büchern und Artikeln.",
        content: "Ab heute haben Studenten freien Zugang zur neuen digitalen Bibliothek der Universität, die über 10.000 Bücher, wissenschaftliche Artikel und Bildungsressourcen enthält. Die Plattform ist rund um die Uhr von jedem Gerät aus zugänglich.\n\nDie Sammlung umfasst Werke aus allen Studienbereichen, von den exakten Wissenschaften bis zu den Geisteswissenschaften. Studenten können Materialien herunterladen, Lesezeichen setzen und personalisierte Leselisten erstellen.\n\nDiese Initiative ist Teil der Digitalisierungsstrategie der Universität und reagiert auf die Forderungen der Studenten nach zugänglicheren Ressourcen.",
        date: "10. Juni 2026",
      },
      fr: {
        title: "Nouvelle bibliothèque numérique : accès gratuit à des milliers de ressources",
        summary: "L'université lance une plateforme numérique avec plus de 10 000 livres et articles.",
        content: "À partir d'aujourd'hui, les étudiants ont accès gratuitement à la nouvelle bibliothèque numérique de l'université, qui contient plus de 10 000 livres, articles scientifiques et ressources pédagogiques. La plateforme est accessible 24h/24 depuis n'importe quel appareil.\n\nLa collection comprend des ouvrages de tous les domaines d'étude, des sciences exactes aux sciences humaines. Les étudiants peuvent télécharger des supports, ajouter des signets et créer des listes de lecture personnalisées.\n\nCette initiative s'inscrit dans la stratégie de numérisation de l'université et répond aux demandes des étudiants pour des ressources plus accessibles.",
        date: "10 juin 2026",
      },
    },
  },
  {
    id: 3,
    image: "/sweat.png",
    translations: {
      ro: {
        title: "Program de mentorat pentru studenții din anul I",
        summary: "Studenții veterani vor ghida noii veniți în adaptarea la viața universitară.",
        content: "Universitatea introduce un program inovator de mentorat prin care studenții din anii superiori vor ghida noii veniți în adaptarea la mediul universitar. Programul va începe din prima săptămână a anului academic.\n\nFiecare student din anul I va fi asociat cu un mentor experimentat care îl va ajuta să navigheze prin provocările primului an universitar. Mentorii vor oferi sfaturi practice despre organizarea timpului, tehnici de studiu și integrarea în comunitatea academică.\n\nProgramul este voluntar și va include întâlniri regulate, sesiuni de grup și activități sociale. Peste 200 de studenți din anii superiori s-au înscris deja ca mentori.",
        date: "8 iunie 2026",
      },
      hu: {
        title: "Mentorprogram az elsőéves hallgatók számára",
        summary: "A tapasztalt hallgatók segítik az újoncokat az egyetemi életbe való beilleszkedésben.",
        content: "Az egyetem innovatív mentorprogramot vezet be, amelynek keretében a felsőbb éves hallgatók segítik az újoncokat az egyetemi környezethez való alkalmazkodásban. A program az akadémiai év első hetében kezdődik.\n\nMinden elsőéves hallgatóhoz tapasztalt mentort rendelnek, aki segíti őket az első egyetemi év kihívásain való átvészelésben. A mentorok gyakorlati tanácsokat adnak az időbeosztásról, a tanulási technikákról és az akadémiai közösségbe való beilleszkedésről.\n\nA program önkéntes, és rendszeres találkozókat, csoportos foglalkozásokat és társadalmi tevékenységeket foglal magában. Több mint 200 felsőbb éves hallgató már jelentkezett mentorként.",
        date: "2026. június 8.",
      },
      en: {
        title: "Mentorship Program for First-Year Students",
        summary: "Veteran students will guide newcomers in adapting to university life.",
        content: "The university is introducing an innovative mentorship program through which upper-year students will guide newcomers in adapting to the university environment. The program will begin in the first week of the academic year.\n\nEach first-year student will be paired with an experienced mentor who will help them navigate the challenges of their first university year. Mentors will provide practical advice on time management, study techniques, and integration into the academic community.\n\nThe program is voluntary and will include regular meetings, group sessions, and social activities. Over 200 upper-year students have already registered as mentors.",
        date: "June 8, 2026",
      },
      de: {
        title: "Mentorenprogramm für Studenten im ersten Jahr",
        summary: "Erfahrene Studenten werden Neuankömmlinge bei der Anpassung an das Unileben begleiten.",
        content: "Die Universität führt ein innovatives Mentorenprogramm ein, durch das Studenten aus höheren Jahrgängen Neuankömmlinge bei der Anpassung an das universitäre Umfeld begleiten. Das Programm beginnt in der ersten Woche des akademischen Jahres.\n\nJeder Erstsemesterstudent wird einem erfahrenen Mentor zugewiesen, der ihm hilft, die Herausforderungen des ersten Studienjahres zu meistern. Mentoren geben praktische Ratschläge zu Zeitmanagement, Lerntechniken und der Integration in die akademische Gemeinschaft.\n\nDas Programm ist freiwillig und umfasst regelmäßige Treffen, Gruppensitzungen und soziale Aktivitäten. Über 200 Studenten aus höheren Jahrgängen haben sich bereits als Mentoren registriert.",
        date: "8. Juni 2026",
      },
      fr: {
        title: "Programme de mentorat pour les étudiants de première année",
        summary: "Des étudiants expérimentés guideront les nouveaux venus dans leur adaptation à la vie universitaire.",
        content: "L'université introduit un programme de mentorat innovant grâce auquel les étudiants des années supérieures guideront les nouveaux venus dans leur adaptation à l'environnement universitaire. Le programme débutera dès la première semaine de l'année académique.\n\nChaque étudiant de première année sera associé à un mentor expérimenté qui l'aidera à surmonter les défis de sa première année universitaire. Les mentors fourniront des conseils pratiques sur la gestion du temps, les techniques d'étude et l'intégration dans la communauté académique.\n\nLe programme est volontaire et comprendra des réunions régulières, des sessions de groupe et des activités sociales. Plus de 200 étudiants des années supérieures se sont déjà inscrits comme mentors.",
        date: "8 juin 2026",
      },
    },
  },
  {
    id: 4,
    image: "/sweat.png",
    translations: {
      ro: {
        title: "Cafenea nouă în campus: spațiu modern pentru studenți",
        summary: "Un nou loc de socializare și studiu se deschide în curtea universității.",
        content: "O cafenea modernă și primitoare își deschide porțile în campus, oferind studenților un spațiu confortabil pentru studiu și socializare. Locația beneficiază de design contemporan și facilități moderne.\n\nCafeneaua dispune de Wi-Fi de mare viteză, prize la fiecare masă și o zonă liniștită dedicată studiului. Meniul include o varietate de cafele specialitate, ceaiuri, snack-uri sănătoase și deserturi.\n\nProgramul este extins, de la 7:00 dimineața până la 22:00 seara. Studenții beneficiază de o reducere de 10% la toate produsele prezentând carnetul de student.",
        date: "5 iunie 2026",
      },
      hu: {
        title: "Új kávézó a campuson: modern tér a hallgatóknak",
        summary: "Az egyetem udvarán egy új szocializációs és tanulási hely nyílik meg.",
        content: "Egy modern és barátságos kávézó nyitja meg kapuit a campuson, kényelmes teret kínálva a hallgatóknak tanuláshoz és szocializálódáshoz. A helyszín kortárs dizájnnal és modern felszereltséggel rendelkezik.\n\nA kávézóban nagy sebességű Wi-Fi, minden asztalnál konnektorok és egy csendes, tanulásra dedikált terület áll rendelkezésre. Az étlap különleges kávék, teák, egészséges snackek és desszertek széles választékát kínálja.\n\nA nyitvatartási idő reggel 7:00-tól este 22:00-ig terjed. A hallgatók hallgatói igazolványuk felmutatásával 10% kedvezményt kapnak minden termékre.",
        date: "2026. június 5.",
      },
      en: {
        title: "New Campus Café: A Modern Space for Students",
        summary: "A new socializing and study spot opens in the university courtyard.",
        content: "A modern and welcoming café is opening its doors on campus, offering students a comfortable space for studying and socializing. The location features contemporary design and modern facilities.\n\nThe café offers high-speed Wi-Fi, outlets at every table, and a quiet area dedicated to studying. The menu includes a variety of specialty coffees, teas, healthy snacks, and desserts.\n\nOperating hours run from 7:00 AM to 10:00 PM. Students receive a 10% discount on all products by presenting their student ID.",
        date: "June 5, 2026",
      },
      de: {
        title: "Neues Campus-Café: Moderner Raum für Studenten",
        summary: "Ein neuer Ort zum Socializen und Lernen eröffnet im Universitätshof.",
        content: "Ein modernes und einladendes Café öffnet seine Türen auf dem Campus und bietet Studenten einen komfortablen Raum zum Lernen und Socializen. Der Standort verfügt über zeitgenössisches Design und moderne Einrichtungen.\n\nDas Café bietet Hochgeschwindigkeits-WLAN, Steckdosen an jedem Tisch und einen ruhigen, dem Lernen gewidmeten Bereich. Die Speisekarte umfasst eine Vielzahl von Spezialitätenkaffees, Tees, gesunden Snacks und Desserts.\n\nDie Öffnungszeiten sind von 7:00 bis 22:00 Uhr. Studenten erhalten mit Studentenausweis 10% Rabatt auf alle Produkte.",
        date: "5. Juni 2026",
      },
      fr: {
        title: "Nouveau café sur le campus : un espace moderne pour les étudiants",
        summary: "Un nouveau lieu de socialisation et d'étude ouvre dans la cour de l'université.",
        content: "Un café moderne et accueillant ouvre ses portes sur le campus, offrant aux étudiants un espace confortable pour étudier et socialiser. Le lieu bénéficie d'un design contemporain et d'équipements modernes.\n\nLe café dispose du Wi-Fi haut débit, de prises électriques à chaque table et d'une zone calme dédiée à l'étude. Le menu propose une variété de cafés de spécialité, de thés, de snacks sains et de desserts.\n\nLes horaires d'ouverture vont de 7h00 à 22h00. Les étudiants bénéficient d'une réduction de 10 % sur tous les produits sur présentation de leur carte étudiante.",
        date: "5 juin 2026",
      },
    },
  },
  {
    id: 5,
    image: "/sweat.png",
    translations: {
      ro: {
        title: "Competiție de robotică: echipele se pregătesc intens",
        summary: "Studenții de la Facultatea de Inginerie participă la competiția internațională.",
        content: "Echipele de robotică ale universității se pregătesc intens pentru competiția internațională care va avea loc luna viitoare la București. Studenții lucrează la roboți autonomi capabili să rezolve sarcini complexe.\n\nProiectele includ roboți care pot naviga prin obstacole, manipula obiecte și comunica între ei pentru a rezolva probleme colaborativ. Echipele petrec zilnic câte 6-8 ore în laborator, testând și îmbunătățind algoritmii.\n\nUniversitatea a investit în echipamente noi și a pus la dispoziție un mentor internațional pentru fiecare echipă. Competiția va reuni peste 50 de universități din toată lumea.",
        date: "3 iunie 2026",
      },
      hu: {
        title: "Robotikai verseny: a csapatok intenzíven készülnek",
        summary: "A Mérnöki Kar hallgatói részt vesznek a nemzetközi versenyen.",
        content: "Az egyetem robotikai csapatai intenzíven készülnek a jövő hónapban Bukarestben megrendezendő nemzetközi versenyre. A hallgatók összetett feladatokat megoldani képes autonóm robotokat fejlesztenek.\n\nA projektek közé tartoznak olyan robotok, amelyek képesek akadályok között navigálni, tárgyakat manipulálni és egymással kommunikálni a problémák együttműködésben való megoldásához. A csapatok naponta 6-8 órát töltenek a laborban az algoritmusok tesztelésével és fejlesztésével.\n\nAz egyetem új felszerelésekbe fektetett be, és minden csapatnak egy nemzetközi mentort biztosított. A verseny a világ több mint 50 egyetemét tömöríti majd.",
        date: "2026. június 3.",
      },
      en: {
        title: "Robotics Competition: Teams Prepare Intensively",
        summary: "Students from the Faculty of Engineering participate in the international competition.",
        content: "The university's robotics teams are preparing intensively for the international competition taking place next month in Bucharest. Students are working on autonomous robots capable of solving complex tasks.\n\nProjects include robots that can navigate through obstacles, manipulate objects, and communicate with each other to solve problems collaboratively. Teams spend 6-8 hours daily in the lab, testing and improving algorithms.\n\nThe university has invested in new equipment and provided an international mentor for each team. The competition will bring together over 50 universities from around the world.",
        date: "June 3, 2026",
      },
      de: {
        title: "Robotikwettbewerb: Teams bereiten sich intensiv vor",
        summary: "Studenten der Ingenieursfakultät nehmen am internationalen Wettbewerb teil.",
        content: "Die Robotik-Teams der Universität bereiten sich intensiv auf den internationalen Wettbewerb vor, der nächsten Monat in Bukarest stattfinden wird. Die Studenten arbeiten an autonomen Robotern, die komplexe Aufgaben lösen können.\n\nDie Projekte umfassen Roboter, die durch Hindernisse navigieren, Objekte manipulieren und miteinander kommunizieren können, um Probleme kollaborativ zu lösen. Teams verbringen täglich 6-8 Stunden im Labor damit, Algorithmen zu testen und zu verbessern.\n\nDie Universität hat in neue Ausrüstung investiert und jedem Team einen internationalen Mentor bereitgestellt. Der Wettbewerb wird über 50 Universitäten aus der ganzen Welt zusammenbringen.",
        date: "3. Juni 2026",
      },
      fr: {
        title: "Compétition de robotique : les équipes se préparent intensément",
        summary: "Les étudiants de la Faculté d'Ingénierie participent à la compétition internationale.",
        content: "Les équipes de robotique de l'université se préparent intensément pour la compétition internationale qui aura lieu le mois prochain à Bucarest. Les étudiants travaillent sur des robots autonomes capables de résoudre des tâches complexes.\n\nLes projets comprennent des robots pouvant naviguer entre des obstacles, manipuler des objets et communiquer entre eux pour résoudre des problèmes de manière collaborative. Les équipes passent quotidiennement 6 à 8 heures en laboratoire à tester et améliorer les algorithmes.\n\nL'université a investi dans de nouveaux équipements et a mis à disposition un mentor international pour chaque équipe. La compétition réunira plus de 50 universités du monde entier.",
        date: "3 juin 2026",
      },
    },
  },
  {
    id: 6,
    image: "/sweat.png",
    translations: {
      ro: {
        title: "Serie de prelegeri despre sustenabilitate și mediu",
        summary: "Experți internaționali vor vorbi despre schimbările climatice și soluții ecologice.",
        content: "Universitatea organizează o serie de prelegeri publice despre sustenabilitate, schimbări climatice și soluții pentru protecția mediului. Evenimentele vor avea loc în fiecare joi seara, timp de două luni.\n\nPrintre invitați se numără cercetători de renume internațional, activiști de mediu și reprezentanți ai organizațiilor ecologiste. Temele abordate vor include energia regenerabilă, reducerea deșeurilor, agricultura durabilă și politici de mediu.\n\nPrelegerile sunt gratuite și deschise pentru toți studenții și membrii comunității. Participanții vor avea ocazia să pună întrebări și să se implice în discuții despre provocările climatice actuale.",
        date: "1 iunie 2026",
      },
      hu: {
        title: "Előadássorozat a fenntarthatóságról és a környezetről",
        summary: "Nemzetközi szakértők fognak beszélni az éghajlatváltozásról és ökológiai megoldásokról.",
        content: "Az egyetem nyilvános előadássorozatot szervez a fenntarthatóságról, az éghajlatváltozásról és a környezetvédelmi megoldásokról. Az eseményekre minden csütörtök este kerül sor, két hónapon keresztül.\n\nA meghívottak között nemzetközi hírű kutatók, környezetvédők és ökológiai szervezetek képviselői szerepelnek. A témák magukban foglalják a megújuló energiát, a hulladékcsökkentést, a fenntartható mezőgazdaságot és a környezetpolitikát.\n\nAz előadások ingyenesek és minden hallgató és közösségi tag számára nyitottak. A résztvevők lehetőséget kapnak kérdések feltevésére és a jelenlegi éghajlati kihívásokról szóló vitákban való részvételre.",
        date: "2026. június 1.",
      },
      en: {
        title: "Lecture Series on Sustainability and the Environment",
        summary: "International experts will speak about climate change and ecological solutions.",
        content: "The university is organizing a series of public lectures on sustainability, climate change, and solutions for environmental protection. Events will take place every Thursday evening for two months.\n\nGuests include internationally renowned researchers, environmental activists, and representatives of ecological organizations. Topics will include renewable energy, waste reduction, sustainable agriculture, and environmental policies.\n\nThe lectures are free and open to all students and community members. Participants will have the opportunity to ask questions and engage in discussions about current climate challenges.",
        date: "June 1, 2026",
      },
      de: {
        title: "Vortragsreihe über Nachhaltigkeit und Umwelt",
        summary: "Internationale Experten werden über den Klimawandel und ökologische Lösungen sprechen.",
        content: "Die Universität organisiert eine Reihe öffentlicher Vorträge über Nachhaltigkeit, Klimawandel und Lösungen für den Umweltschutz. Die Veranstaltungen finden jeden Donnerstagabend für zwei Monate statt.\n\nZu den Gästen gehören international renommierte Forscher, Umweltaktivisten und Vertreter ökologischer Organisationen. Die Themen umfassen erneuerbare Energien, Abfallreduzierung, nachhaltige Landwirtschaft und Umweltpolitik.\n\nDie Vorträge sind kostenlos und für alle Studenten und Gemeinschaftsmitglieder offen. Die Teilnehmer haben die Möglichkeit, Fragen zu stellen und sich an Diskussionen über aktuelle Klimaherausforderungen zu beteiligen.",
        date: "1. Juni 2026",
      },
      fr: {
        title: "Série de conférences sur la durabilité et l'environnement",
        summary: "Des experts internationaux parleront du changement climatique et des solutions écologiques.",
        content: "L'université organise une série de conférences publiques sur la durabilité, le changement climatique et les solutions pour la protection de l'environnement. Les événements auront lieu chaque jeudi soir pendant deux mois.\n\nParmi les invités figurent des chercheurs de renommée internationale, des militants écologistes et des représentants d'organisations environnementales. Les thèmes abordés incluront les énergies renouvelables, la réduction des déchets, l'agriculture durable et les politiques environnementales.\n\nLes conférences sont gratuites et ouvertes à tous les étudiants et membres de la communauté. Les participants auront l'occasion de poser des questions et de s'engager dans des discussions sur les défis climatiques actuels.",
        date: "1er juin 2026",
      },
    },
}
];

// ==========================================
// API ROUTES
// ==========================================

// 1. GET all news
app.get('/api/news', (req, res) => {
    res.json(newsData);
});

// 2. GET a single news article by ID
app.get('/api/news/:id', (req, res) => {
    const article = newsData.find(a => a.id.toString() === req.params.id);
    if (!article) {
        return res.status(404).json({ message: "Article not found" });
    }
    res.json(article);
});

// ==========================================
// SERVER STARTUP
// ==========================================
app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n🚀 In-Memory Backend running!`);
    console.log(`Local Access: http://localhost:${PORT}`);
    console.log(`LAN Access:   use ${PORT}port on phone!`);
    console.log(`\nData has been seeded with ${newsData.length} translated articles.`);
});
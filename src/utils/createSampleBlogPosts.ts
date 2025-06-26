
import { supabase } from '@/integrations/supabase/client';

const samplePosts = [
  {
    title: "EMS Training: Il Futuro del Fitness è Già Qui",
    slug: "ems-training-futuro-fitness",
    excerpt: "Scopri come l'elettrostimolazione muscolare sta rivoluzionando il mondo dell'allenamento, permettendo risultati straordinari in soli 20 minuti.",
    content: `
      <p>L'EMS (Electrical Muscle Stimulation) rappresenta una vera rivoluzione nel mondo del fitness. Questa tecnologia innovativa utilizza impulsi elettrici per stimolare le contrazioni muscolari, permettendo di ottenere risultati straordinari in tempi ridotti.</p>
      
      <h2>Come Funziona l'EMS</h2>
      <p>Durante una sessione di EMS, elettrodi vengono posizionati sui principali gruppi muscolari. Gli impulsi elettrici stimolano le fibre muscolari profonde, creando contrazioni intense e sincronizzate che coinvolgono fino al 90% delle fibre muscolari.</p>
      
      <h2>I Vantaggi dell'EMS Training</h2>
      <ul>
        <li><strong>Efficienza temporale:</strong> 20 minuti di EMS equivalgono a 90 minuti di allenamento tradizionale</li>
        <li><strong>Risultati rapidi:</strong> Miglioramenti visibili già dopo 2-3 settimane</li>
        <li><strong>Basso impatto:</strong> Riduce lo stress su articolazioni e legamenti</li>
        <li><strong>Personalizzazione:</strong> Intensità regolabile per ogni gruppo muscolare</li>
      </ul>
      
      <h2>Per Chi è Indicato</h2>
      <p>L'EMS è perfetto per professionisti con poco tempo, persone in riabilitazione, atleti che vogliono potenziare le performance e chiunque desideri risultati rapidi ed efficaci.</p>
      
      <p>Da MUV Fitness Center, i nostri istruttori certificati ti guidano attraverso programmi EMS personalizzati, garantendo sicurezza e massima efficacia.</p>
    `,
    category_id: 'fitness',
    reading_time: 4,
    meta_title: "EMS Training: Rivoluzione Fitness in 20 Minuti | MUV Fitness",
    meta_description: "Scopri l'EMS training: elettrostimolazione muscolare per risultati fitness straordinari in soli 20 minuti. Efficace, sicuro e personalizzato.",
    meta_keywords: "EMS training, elettrostimolazione muscolare, fitness veloce, allenamento efficace"
  },
  {
    title: "Pancafit: Ritrova il Benessere della Tua Schiena",
    slug: "pancafit-benessere-schiena",
    excerpt: "Il metodo Pancafit per il riequilibrio posturale e il sollievo dal mal di schiena. Scopri come questo innovativo strumento può migliorare la tua qualità di vita.",
    content: `
      <p>Il Pancafit è uno strumento rivoluzionario per il riequilibrio posturale globale, sviluppato dal Prof. Daniele Raggi. Questo attrezzo permette di allungare la catena muscolare posteriore e anteriore in modo globale e decompensato.</p>
      
      <h2>Cos'è il Pancafit</h2>
      <p>Il Pancafit è un attrezzo brevettato costituito da due piani inclinati che permettono di assumere posizioni specifiche per l'allungamento muscolare. La sua particolarità sta nel fatto che permette di lavorare in scarico articolare, riducendo al minimo le tensioni.</p>
      
      <h2>Benefici del Metodo Pancafit</h2>
      <ul>
        <li><strong>Riequilibrio posturale:</strong> Corregge le disfunzioni posturali</li>
        <li><strong>Sollievo dal dolore:</strong> Efficace contro mal di schiena, cervicalgie e lombosciatalgie</li>
        <li><strong>Maggiore flessibilità:</strong> Migliora l'elasticità muscolare</li>
        <li><strong>Rilassamento:</strong> Riduce stress e tensioni accumulate</li>
        <li><strong>Prevenzione:</strong> Previene l'insorgenza di problematiche muscolo-scheletriche</li>
      </ul>
      
      <h2>A Chi è Rivolto</h2>
      <p>Il Pancafit è adatto a persone di tutte le età, da chi soffre di problemi posturali specifici a chi vuole mantenere un buono stato di salute della colonna vertebrale. È particolarmente indicato per chi lavora molte ore seduto o in posizioni statiche.</p>
      
      <p>Nel nostro centro, i nostri operatori specializzati Pancafit ti accompagnano in un percorso personalizzato verso il benessere della tua schiena.</p>
    `,
    category_id: 'benessere',
    reading_time: 5,
    meta_title: "Pancafit: Riequilibrio Posturale e Benessere Schiena | MUV",
    meta_description: "Scopri il metodo Pancafit per il riequilibrio posturale. Sollievo dal mal di schiena e miglioramento della flessibilità con operatori specializzati.",
    meta_keywords: "Pancafit, riequilibrio posturale, mal di schiena, benessere colonna vertebrale"
  },
  {
    title: "Alimentazione e Allenamento: La Guida Completa",
    slug: "alimentazione-allenamento-guida",
    excerpt: "Come ottimizzare la tua alimentazione per supportare i tuoi obiettivi di fitness. Consigli pratici su cosa mangiare prima, durante e dopo l'allenamento.",
    content: `
      <p>L'alimentazione rappresenta il 70% del successo di qualsiasi programma di fitness. Comprendere come nutrire correttamente il tuo corpo può fare la differenza tra raggiungere i tuoi obiettivi o rimanere fermi al punto di partenza.</p>
      
      <h2>I Macronutrienti Essenziali</h2>
      <h3>Proteine</h3>
      <p>Le proteine sono fondamentali per la crescita e il recupero muscolare. Punta a consumare 1,6-2,2g per kg di peso corporeo se ti alleni regolarmente.</p>
      
      <h3>Carboidrati</h3>
      <p>I carboidrati forniscono energia per gli allenamenti. Preferisci carboidrati complessi come avena, riso integrale e quinoa.</p>
      
      <h3>Grassi</h3>
      <p>I grassi sani supportano la produzione ormonale e l'assorbimento delle vitamine. Includi avocado, noci e olio extravergine d'oliva.</p>
      
      <h2>Timing Nutrizionale</h2>
      <h3>Pre-Allenamento (1-2 ore prima)</h3>
      <ul>
        <li>Carboidrati facilmente digeribili</li>
        <li>Moderate proteine</li>
        <li>Pochi grassi e fibre</li>
      </ul>
      
      <h3>Post-Allenamento (entro 30-60 minuti)</h3>
      <ul>
        <li>Proteine ad alto valore biologico</li>
        <li>Carboidrati per il ripristino del glicogeno</li>
        <li>Idratazione adeguata</li>
      </ul>
      
      <h2>Integratori Utili</h2>
      <p>Sebbene una dieta equilibrata sia prioritaria, alcuni integratori possono supportare le tue performance:</p>
      <ul>
        <li><strong>Proteine whey:</strong> Per il recupero muscolare</li>
        <li><strong>Creatina:</strong> Per forza e potenza</li>
        <li><strong>Omega-3:</strong> Per la salute generale</li>
        <li><strong>Vitamina D:</strong> Per ossa e sistema immunitario</li>
      </ul>
      
      <p>Ricorda: la costanza nell'alimentazione è più importante della perfezione. Con il nostro MUV Planner puoi creare piani alimentari personalizzati basati sui tuoi obiettivi specifici.</p>
    `,
    category_id: 'nutrizione',
    reading_time: 6,
    meta_title: "Alimentazione e Allenamento: Guida Completa | MUV Fitness",
    meta_description: "Guida completa su alimentazione e fitness: macronutrienti, timing nutrizionale, integratori. Ottimizza la tua dieta per migliori risultati di allenamento.",
    meta_keywords: "alimentazione fitness, nutrizione sportiva, macronutrienti, timing nutrizionale"
  },
  {
    title: "5 Ricette Post-Allenamento per il Recupero Muscolare",
    slug: "ricette-post-allenamento-recupero",
    excerpt: "Ricette gustose e nutrienti per ottimizzare il recupero dopo l'allenamento. Proteine, carboidrati e antiossidanti in piatti facili da preparare.",
    content: `
      <p>Il post-allenamento è un momento cruciale per il recupero muscolare. Queste 5 ricette ti aiuteranno a fornire al tuo corpo i nutrienti necessari in modo gustoso e pratico.</p>
      
      <h2>1. Smoothie Proteico alla Banana e Avena</h2>
      <h3>Ingredienti:</h3>
      <ul>
        <li>1 banana matura</li>
        <li>30g avena</li>
        <li>250ml latte di mandorle</li>
        <li>1 misurino di proteine alla vaniglia</li>
        <li>1 cucchiaio di miele</li>
        <li>Cannella q.b.</li>
      </ul>
      <p><strong>Preparazione:</strong> Frulla tutti gli ingredienti fino ad ottenere una consistenza cremosa. Perfetto entro 30 minuti dall'allenamento.</p>
      
      <h2>2. Bowl di Quinoa con Pollo e Verdure</h2>
      <h3>Ingredienti:</h3>
      <ul>
        <li>100g quinoa cotta</li>
        <li>120g petto di pollo grigliato</li>
        <li>Broccoli al vapore</li>
        <li>Pomodorini</li>
        <li>Avocado</li>
        <li>Olio EVO e limone</li>
      </ul>
      <p><strong>Preparazione:</strong> Componi la bowl con tutti gli ingredienti e condisci con olio e limone. Ricca di proteine complete e carboidrati complessi.</p>
      
      <h2>3. Uova Strapazzate con Toast Integrale</h2>
      <h3>Ingredienti:</h3>
      <ul>
        <li>2 uova biologiche</li>
        <li>2 fette di pane integrale</li>
        <li>Spinaci freschi</li>
        <li>Pomodorini</li>
        <li>Olio EVO</li>
      </ul>
      <p><strong>Preparazione:</strong> Cuoci le uova con gli spinaci, servi sul toast tostato con pomodorini. Ottimo equilibrio di proteine e carboidrati.</p>
      
      <h2>4. Yogurt Greco con Frutti di Bosco e Granola</h2>
      <h3>Ingredienti:</h3>
      <ul>
        <li>200g yogurt greco 0% grassi</li>
        <li>Mix di frutti di bosco</li>
        <li>30g granola integrale</li>
        <li>1 cucchiaio di miele</li>
        <li>Noci tritate</li>
      </ul>
      <p><strong>Preparazione:</strong> Stratifica yogurt, frutti di bosco e granola. Ricco di proteine, antiossidanti e carboidrati.</p>
      
      <h2>5. Salmone alla Griglia con Patate Dolci</h2>
      <h3>Ingredienti:</h3>
      <ul>
        <li>120g filetto di salmone</li>
        <li>1 patata dolce media</li>
        <li>Asparagi</li>
        <li>Olio EVO, limone, erbe aromatiche</li>
      </ul>
      <p><strong>Preparazione:</strong> Griglia il salmone e cuoci la patata dolce al forno con gli asparagi. Omega-3, proteine nobili e carboidrati complessi.</p>
      
      <h2>Consigli Nutrizionali</h2>
      <ul>
        <li>Consuma il pasto entro 2 ore dall'allenamento</li>
        <li>Idratati abbondantemente</li>
        <li>Varia le tue scelte per un apporto nutrizionale completo</li>
        <li>Adatta le porzioni ai tuoi obiettivi</li>
      </ul>
      
      <p>Per piani alimentari personalizzati basati sui tuoi allenamenti, prova il nostro MUV Planner gratuito!</p>
    `,
    category_id: 'ricette',
    reading_time: 5,
    meta_title: "5 Ricette Post-Allenamento per Recupero Muscolare | MUV",
    meta_description: "Ricette gustose post-allenamento per il recupero: smoothie proteici, bowl nutrienti, piatti bilanciati. Ottimizza il tuo recupero muscolare.",
    meta_keywords: "ricette post-allenamento, recupero muscolare, alimentazione sportiva, ricette fitness"
  }
];

export const createSampleBlogPosts = async () => {
  try {
    // Get category IDs
    const { data: categories } = await supabase
      .from('blog_categories')
      .select('id, slug');

    if (!categories) return;

    const categoryMap = categories.reduce((acc, cat) => {
      acc[cat.slug] = cat.id;
      return acc;
    }, {} as Record<string, string>);

    // Create posts with correct category IDs
    const postsWithCategoryIds = samplePosts.map(post => ({
      ...post,
      category_id: categoryMap[post.category_id] || null,
      status: 'published' as const,
      published_at: new Date().toISOString()
    }));

    const { data, error } = await supabase
      .from('blog_posts')
      .insert(postsWithCategoryIds)
      .select();

    if (error) {
      console.error('Error creating sample posts:', error);
      return;
    }

    console.log('Sample blog posts created successfully:', data);
    return data;
  } catch (error) {
    console.error('Error in createSampleBlogPosts:', error);
  }
};

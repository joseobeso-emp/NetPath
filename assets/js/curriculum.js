/* NetPath — mappa completa del percorso
   Ogni lezione: id, titolo, sommario, minuti, ready (file esistente)
   `ready:false` => voce visibile ma non cliccabile ("in arrivo") */

window.NETPATH_CURRICULUM = [
{
  id: "l1", n: 1, key: "lv1",
  title: "Fondamenta",
  subtitle: "Base",
  blurb: "Da 'non so nemmeno cosa sia un pacchetto' a 'capisco cosa succede quando clicco un link'. Qui non si dà niente per scontato: si parte dal filo di rame.",
  outcome: "Sai leggere un indirizzo IP, capisci perché un PC non naviga, sai usare ping e traceroute con criterio e sai dire dove sta il problema.",
  hours: "45–60 ore",
  chapters: [
    { title: "Che cos'è una rete", lessons: [
      { id:"l1-01", t:"Che cos'è una rete: dal filo al pacchetto", s:"L'idea di base spiegata come la spiegheresti a un dodicenne, e perché tutto il resto discende da qui.", m:18, ready:true },
      { id:"l1-02", t:"Il vocabolario minimo: host, nodo, client, server", s:"Le dieci parole che senti ogni giorno in ufficio e che devi smettere di annuire senza capire.", m:15, ready:true },
      { id:"l1-03", t:"Il modello a strati: perché esiste OSI", s:"Sette livelli, spiegati con un pacco spedito da Milano a Tokyo. Il modello mentale più importante di tutto il corso.", m:24, ready:true },
      { id:"l1-04", t:"Incapsulamento: le buste dentro le buste", s:"Come un click diventa bit sul cavo, strato dopo strato, e come si torna indietro.", m:20, ready:true }
    ]},
    { title: "Il mondo fisico", lessons: [
      { id:"l1-05", t:"Cavi di rame: categorie, pin, errori classici", s:"Cat5e, Cat6, Cat6a, schermature, lunghezze massime e i tre errori che causano il 40% dei ticket 'la rete è lenta'.", m:22, ready:true },
      { id:"l1-06", t:"Fibra ottica: tipi, connettori, transceiver", s:"Monomodale e multimodale, LC/SC, SFP e SFP+, perché un patch giallo non va dove serve un arancione.", m:20, ready:true },
      { id:"l1-07", t:"Gli apparati: hub, switch, router, firewall, AP", s:"Cosa fa fisicamente ogni scatola che vedi nel rack, e a quale livello OSI lavora.", m:22, ready:true },
      { id:"l1-08", t:"Rack, alimentazione, PoE e messa a terra", s:"La parte che nessuno insegna e che ti salva quando l'access point si riavvia da solo.", m:18, ready:true }
    ]},
    { title: "Ethernet e switching", lessons: [
      { id:"l1-09", t:"MAC address e frame Ethernet", s:"L'indirizzo scritto in fabbrica, campo per campo, con il frame disegnato byte per byte.", m:20, ready:true },
      { id:"l1-10", t:"Come uno switch impara: la tabella MAC", s:"Il meccanismo più elegante del networking, spiegato in cinque passaggi che puoi verificare tu stesso.", m:20, ready:true },
      { id:"l1-11", t:"Domini di collisione e di broadcast", s:"Perché una rete piatta da 400 PC muore, e perché la soluzione si chiama VLAN.", m:18, ready:true }
    ]},
    { title: "Indirizzamento IP", lessons: [
      { id:"l1-12", t:"IPv4: come è fatto un indirizzo", s:"Quattro numeri, 32 bit, e la domanda che conta: dove finisce la rete e dove inizia il computer?", m:20, ready:true },
      { id:"l1-13", t:"Binario ed esadecimale senza panico", s:"La matematica minima indispensabile. Niente algebra: solo otto colonne e un trucco per farla a mente.", m:22, ready:true },
      { id:"l1-14", t:"Subnet mask e CIDR", s:"/24, /26, 255.255.255.0: cosa significano davvero e come si passa da una notazione all'altra.", m:24, ready:true },
      { id:"l1-15", t:"Subnetting passo passo", s:"Il capitolo che fa paura, smontato in una procedura di 4 passi che funziona sempre. Con esercizi generati a caso.", m:30, ready:true },
      { id:"l1-16", t:"Indirizzi privati, pubblici e speciali", s:"RFC1918, loopback, APIPA, link-local, CGNAT: chi è chi e perché te ne accorgi guardando un ipconfig.", m:18, ready:true }
    ]},
    { title: "I servizi che tengono in piedi tutto", lessons: [
      { id:"l1-17", t:"ARP: il ponte tra IP e MAC", s:"Il protocollo di cui nessuno parla e che spiega metà dei problemi di rete locale.", m:20, ready:true },
      { id:"l1-18", t:"Default gateway e tabella di routing", s:"Come un PC decide se parlare direttamente o passare dal router. La decisione più importante di ogni pacchetto.", m:24, ready:true },
      { id:"l1-19", t:"DHCP: come un dispositivo ottiene un indirizzo", s:"DORA passo passo, lease, riservazioni, e cosa significa quando vedi un 169.254.x.x.", m:22, ready:true },
      { id:"l1-20", t:"DNS: la rubrica di Internet", s:"Dalla cache del browser ai root server, con il percorso completo di una risoluzione.", m:26, ready:true },
      { id:"l1-21", t:"NAT: perché tutti usano 192.168.x.x", s:"Come 200 dispositivi escono su Internet con un solo indirizzo pubblico, e cosa si rompe di conseguenza.", m:24, ready:true }
    ]},
    { title: "Trasporto, strumenti e metodo", lessons: [
      { id:"l1-22", t:"TCP e UDP: porte, socket, handshake", s:"La differenza tra una raccomandata e una cartolina, e perché le videochiamate usano la cartolina.", m:24, ready:true },
      { id:"l1-23", t:"Cosa succede davvero quando apri un sito", s:"La lezione che rimette insieme tutto: 14 passaggi da quando premi Invio a quando vedi la pagina.", m:26, ready:true },
      { id:"l1-24", t:"La cassetta degli attrezzi", s:"ping, traceroute, nslookup/dig, netstat, nc, Wireshark: cosa ti dicono davvero e come si leggono.", m:28, ready:true },
      { id:"l1-25", t:"Metodo di troubleshooting: dal cavo all'app", s:"Il processo che trasforma 'non funziona niente' in una diagnosi in 10 minuti. Da applicare da domani sui ticket.", m:26, ready:true }
    ]}
  ]
},
{
  id: "l2", n: 2, key: "lv2",
  title: "Rete aziendale",
  subtitle: "Medio",
  blurb: "Il livello dove si vive davvero: VLAN, firewall, VPN, Wi-Fi. Tutto quello che trovi nei ticket di un MSP.",
  outcome: "Configuri da solo una sede tipo: VLAN, routing, regole firewall, tunnel verso la sede centrale, Wi-Fi con RADIUS. E sai spiegare al cliente cosa hai fatto.",
  hours: "90–120 ore",
  chapters: [
    { title: "Segmentare la rete", lessons: [
      { id:"l2-01", t:"VLAN: perché dividere è la prima difesa", s:"Da una rete piatta a una rete progettata. Il concetto, non i comandi.", m:24, ready:true },
      { id:"l2-02", t:"802.1Q, trunk e native VLAN", s:"Il tag da 4 byte che cambia tutto, e l'errore di native VLAN che fa impazzire i tecnici.", m:26, ready:true },
      { id:"l2-03", t:"Inter-VLAN routing: router-on-a-stick e SVI", s:"Come far parlare due VLAN, con le tre architetture che incontri sul campo.", m:26, ready:true },
      { id:"l2-04", t:"Progettare uno schema VLAN per un cliente", s:"Dallo studio del cliente alla tabella VLAN/subnet/nome. Con template riutilizzabile.", m:24, ready:true }
    ]},
    { title: "Resilienza di livello 2", lessons: [
      { id:"l2-05", t:"Spanning Tree: perché la rete 'si impalla'", s:"Loop, broadcast storm, root bridge, e perché non devi mai collegare due switch a caso.", m:28, ready:true },
      { id:"l2-06", t:"LACP e aggregazione di link", s:"Raddoppiare la banda (o quasi) e sopravvivere alla rottura di un cavo.", m:20, ready:true },
      { id:"l2-07", t:"Port security, storm control, loop protection", s:"Le protezioni che accendi il primo giorno e che nessuno accende mai.", m:20, ready:true }
    ]},
    { title: "Routing", lessons: [
      { id:"l2-08", t:"La tabella di routing in profondità", s:"Longest prefix match, route connesse, statiche, di default: come si legge una routing table vera.", m:26, ready:true },
      { id:"l2-09", t:"Route statiche, metriche, distanza amministrativa", s:"Perché due route per la stessa destinazione non sono un errore, e chi vince.", m:22, ready:true },
      { id:"l2-10", t:"OSPF: il primo routing dinamico", s:"Aree, adiacenze, LSA, costi. Spiegato con una città e le sue strade.", m:30, ready:true },
      { id:"l2-11", t:"Policy routing e route leaking", s:"Quando la destinazione non basta a decidere la strada.", m:22, ready:true }
    ]},
    { title: "Firewall e NAT", lessons: [
      { id:"l2-12", t:"Firewall stateful: come ragiona davvero", s:"La tabella delle sessioni, il traffico di ritorno, e perché 'ho aperto la porta' spesso non basta.", m:28, ready:true },
      { id:"l2-13", t:"Zone, interfacce, policy: l'ordine conta", s:"Il modello di policy di Fortinet, Sophos e WatchGuard messi a confronto.", m:26, ready:true },
      { id:"l2-14", t:"NAT avanzato: SNAT, DNAT, hairpin", s:"Il NAT che ti serve davvero nei ticket, incluso il caso che nessuno sa risolvere.", m:26, ready:true },
      { id:"l2-15", t:"Pubblicare un servizio senza aprire un buco", s:"Port forward fatto bene: restrizioni sorgente, geo-IP, IPS, certificati.", m:24, ready:true }
    ]},
    { title: "VPN", lessons: [
      { id:"l2-16", t:"IPsec spiegato: IKE fase 1 e fase 2", s:"SA, proposte, PFS, DH group. Perché i due lati devono dire esattamente la stessa cosa.", m:30, ready:true },
      { id:"l2-17", t:"Site-to-site: far parlare due sedi", s:"Dal disegno alla configurazione, con il selettore di traffico spiegato bene.", m:28, ready:true },
      { id:"l2-18", t:"VPN client: SSL VPN, IKEv2, WireGuard", s:"Le tre famiglie, i loro compromessi e quando scegliere quale.", m:24, ready:true },
      { id:"l2-19", t:"Diagnosticare un tunnel che non sale", s:"Il metodo in 6 passi che risolve il 90% dei casi, con i log da leggere su ogni vendor.", m:26, ready:true }
    ]},
    { title: "Wireless", lessons: [
      { id:"l2-20", t:"Radiofrequenza per chi non è ingegnere", s:"Onde, dB, attenuazione, interferenza: il minimo per non dire sciocchezze.", m:26, ready:true },
      { id:"l2-21", t:"Canali, potenza, roaming e site survey", s:"Perché alzare la potenza peggiora le cose, e come si progetta una copertura.", m:28, ready:true },
      { id:"l2-22", t:"Wi-Fi enterprise: WPA2/3-Enterprise e RADIUS", s:"Autenticazione con le credenziali aziendali, certificati, VLAN dinamiche.", m:26, ready:true }
    ]},
    { title: "Servizi e osservabilità", lessons: [
      { id:"l2-23", t:"DHCP avanzato: relay, option, riservazioni", s:"Option 43, 66, 150, relay tra VLAN e i casi che vedi con telefoni e AP.", m:22, ready:true },
      { id:"l2-24", t:"DNS avanzato: record, forwarder, split-brain", s:"A, AAAA, CNAME, MX, SRV, TXT. DNS interno di Active Directory e i suoi tranelli.", m:28, ready:true },
      { id:"l2-25", t:"Log, SNMP, syslog e NetFlow", s:"Come si costruisce visibilità su una rete che non hai progettato tu.", m:24, ready:true },
      { id:"l2-26", t:"QoS: dare la precedenza a chi serve", s:"DSCP, code, shaping, policing. Il VoIP che gracchia e come si sistema.", m:26, ready:true }
    ]},
    { title: "IPv6 e documentazione", lessons: [
      { id:"l2-27", t:"IPv6 senza paura", s:"Indirizzi, SLAAC, NDP, dual stack. Perché non è 'IPv4 con più numeri'.", m:30, ready:true },
      { id:"l2-28", t:"Documentare una rete come un professionista", s:"Schema logico, fisico, IP plan, naming, credenziali. Quello che lasci a chi viene dopo di te.", m:22, ready:true }
    ]}
  ]
},
{
  id: "l3", n: 3, key: "lv3",
  title: "Avanzato",
  subtitle: "Specialista",
  blurb: "Dove smetti di configurare e inizi a decidere. Alta disponibilità, WAN, sicurezza profonda, cloud.",
  outcome: "Progetti una rete multi-sede con HA e SD-WAN, integri Azure, fai SSL inspection consapevole e leggi una cattura Wireshark per trovare la causa vera.",
  hours: "120–160 ore",
  chapters: [
    { title: "Progettare la LAN", lessons: [
      { id:"l3-01", t:"Architettura core / distribution / access", s:"I tre livelli classici, il collapsed core, e quando ognuno ha senso.", m:28, ready:true },
      { id:"l3-02", t:"Alta disponibilità: HA firewall, VRRP, stack", s:"Active-passive, active-active, split brain e come si testa un failover sul serio.", m:30, ready:true },
      { id:"l3-03", t:"Dimensionare: throughput, sessioni, licenze", s:"Come si sceglie il modello giusto senza fidarsi del datasheet.", m:24, ready:true }
    ]},
    { title: "WAN e multi-sede", lessons: [
      { id:"l3-04", t:"BGP essenziale per chi fa MSP", s:"AS, peering, attributi, annunci. Il minimo che serve davvero fuori dai grandi ISP.", m:32, ready:true },
      { id:"l3-05", t:"SD-WAN: cosa risolve davvero", s:"Oltre il marketing: SLA, health check, regole applicative, failover trasparente.", m:30, ready:true },
      { id:"l3-06", t:"Overlay: GRE, VXLAN, IPsec overlay", s:"Reti dentro le reti, e perché ormai sono ovunque.", m:28, ready:true },
      { id:"l3-07", t:"Connettività: FTTH, FWA, MPLS, backup 4G/5G", s:"Cosa vendono gli operatori, cosa consegnano, cosa scrivere nel contratto.", m:24, ready:true }
    ]},
    { title: "Sicurezza di rete", lessons: [
      { id:"l3-08", t:"SSL/TLS inspection: come e quando", s:"Il compromesso più delicato che farai: cosa vedi, cosa rompi, cosa dice il GDPR.", m:30, ready:true },
      { id:"l3-09", t:"IPS/IDS, antivirus di rete, sandboxing", s:"Firme, anomalie, falsi positivi e come si tara un IPS senza bloccare il gestionale.", m:28, ready:true },
      { id:"l3-10", t:"Web filtering, proxy, application control", s:"Categorie, SNI, QUIC, e perché bloccare un sito è più difficile di quanto sembri.", m:26, ready:true },
      { id:"l3-11", t:"Attacchi di rete comuni e difese", s:"ARP spoofing, rogue DHCP, VLAN hopping, DNS poisoning, esfiltrazione. Con la difesa per ognuno.", m:30, ready:true },
      { id:"l3-12", t:"Segmentazione e Zero Trust", s:"Microsegmentazione, east-west, e come si vende un progetto di segmentazione.", m:28, ready:true }
    ]},
    { title: "Identità e accesso", lessons: [
      { id:"l3-13", t:"RADIUS, LDAP, SAML: chi sei e cosa puoi", s:"I tre pilastri dell'autenticazione di rete, con i flussi disegnati.", m:28, ready:true },
      { id:"l3-14", t:"802.1X e NAC in pratica", s:"Autenticare la porta dello switch. Supplicant, authenticator, server, e il piano B.", m:30, ready:true }
    ]},
    { title: "Cloud networking (Azure)", lessons: [
      { id:"l3-15", t:"VNet, subnet, NSG, UDR", s:"Il networking di Azure mappato uno a uno su quello che già sai.", m:30, ready:true },
      { id:"l3-16", t:"VPN Gateway, ExpressRoute, Virtual WAN", s:"Le tre strade per entrare in Azure, con costi e limiti reali.", m:28, ready:true },
      { id:"l3-17", t:"Ibrido: collegare on-prem ad Azure", s:"DNS, routing, overlapping, Entra ID. Il progetto tipo di un'azienda italiana.", m:30, ready:true },
      { id:"l3-18", t:"Azure Firewall, NVA e hub-and-spoke", s:"La topologia standard e come ci si mette un FortiGate dentro.", m:28, ready:true }
    ]},
    { title: "Performance e analisi", lessons: [
      { id:"l3-19", t:"MTU, MSS clamping, frammentazione", s:"La causa nascosta di 'alcuni siti non si aprono' dentro le VPN.", m:26, ready:true },
      { id:"l3-20", t:"Wireshark avanzato: leggere un problema", s:"Filtri, follow stream, expert info, grafici IO. Dalla cattura alla causa.", m:34, ready:true },
      { id:"l3-21", t:"Latenza, jitter, perdita: misurare sul serio", s:"iperf, mtr, smokeping. Come si dimostra che il problema non è tuo.", m:24, ready:true }
    ]}
  ]
},
{
  id: "l4", n: 4, key: "lv4",
  title: "Esperto",
  subtitle: "Architetto",
  blurb: "Il livello in cui il cliente ti chiede 'cosa facciamo?' e la risposta la dai tu, con un documento in mano.",
  outcome: "Progetti da zero una rete multi-sede, scrivi l'HLD, gestisci il cutover, guidi un incidente e conosci a fondo i vendor con cui lavori.",
  hours: "100–140 ore + esperienza sul campo",
  chapters: [
    { title: "Progettare per un cliente", lessons: [
      { id:"l4-01", t:"Raccolta requisiti e sopralluogo", s:"Le 40 domande da fare prima di disegnare qualsiasi cosa. Checklist stampabile.", m:26, ready:false },
      { id:"l4-02", t:"IP addressing plan su larga scala", s:"Uno schema che regge 50 sedi e 10 anni, senza rifare tutto ogni volta.", m:28, ready:false },
      { id:"l4-03", t:"Il documento di progetto (HLD/LLD)", s:"Cosa contiene, come si scrive, come si fa approvare. Con modello completo.", m:30, ready:false },
      { id:"l4-04", t:"Capitolato, BOM e preventivo", s:"Tradurre un progetto in una lista di codici prodotto e giornate uomo.", m:24, ready:false }
    ]},
    { title: "Operare come senior", lessons: [
      { id:"l4-05", t:"Gestire un ticket: metodo e comunicazione", s:"Dal 'non va la rete' alla chiusura documentata. Il pezzo che distingue un senior.", m:26, ready:false },
      { id:"l4-06", t:"Incident, escalation e postmortem", s:"Chi chiami, quando, cosa scrivi. E come si impara da un disastro.", m:24, ready:false },
      { id:"l4-07", t:"Migrazioni e cutover senza downtime", s:"Piano, prove, rollback, finestra. Come si cambia il firewall di un'azienda di notte.", m:28, ready:false }
    ]},
    { title: "Vendor deep dive", lessons: [
      { id:"l4-08", t:"Fortinet: FortiGate dalla A alla Z", s:"Architettura, policy, SD-WAN, FortiAnalyzer, CLI utile, diagnose sniffer.", m:40, ready:false },
      { id:"l4-09", t:"Sophos: Firewall XGS e Central", s:"Il modello di regole, Security Heartbeat, SD-RED, gestione multi-tenant.", m:36, ready:false },
      { id:"l4-10", t:"Cisco: Meraki e Catalyst", s:"Il cloud-managed contro l'on-box, e quando Meraki è la scelta sbagliata.", m:34, ready:false },
      { id:"l4-11", t:"WatchGuard Firebox", s:"Policy Manager, Dimension, la logica dei proxy action.", m:30, ready:false },
      { id:"l4-12", t:"MikroTik RouterOS", s:"Il coltellino svizzero: perché è potentissimo e pericolosissimo. Il tuo hAP ax² usato al massimo.", m:38, ready:false }
    ]},
    { title: "Automazione", lessons: [
      { id:"l4-13", t:"API e script: smettere di cliccare", s:"REST API dei firewall, PowerShell, Python. Automatizzare i task ripetitivi da MSP.", m:30, ready:false },
      { id:"l4-14", t:"Backup di configurazione e IaC", s:"Versionare le configurazioni di 200 apparati e dormire la notte.", m:26, ready:false }
    ]},
    { title: "Capstone", lessons: [
      { id:"l4-15", t:"Progetto finale: rete multi-sede completa", s:"Sede centrale, 3 filiali, Azure, Wi-Fi, VoIP, sicurezza. Da requisiti a documentazione.", m:120, ready:false },
      { id:"l4-16", t:"Carriera e certificazioni", s:"Quali certificazioni valgono davvero in Italia per un MSP, in che ordine, e quanto costano.", m:22, ready:false }
    ]}
  ]
},
{
  id: "mt", n: "MT", key: "mt", label: "Modulo MikroTik",
  title: "MikroTik RouterOS",
  subtitle: "Pratico · hAP ax²",
  blurb: "Un apparato vero sulla scrivania, dalla scatola alla configurazione da senior. Qui non si legge soltanto: ogni lezione finisce con le mani sulla tastiera. Si configura, si rompe di proposito, si ripara.",
  outcome: "Sai progettare, configurare, mettere in sicurezza e diagnosticare un MikroTik in produzione — VLAN, firewall, VPN, Wi-Fi 6, QoS, automazione — e soprattutto sai rientrare quando ti sei chiuso fuori.",
  hours: "70–90 ore",
  chapters: [
    { title: "Prima di toccare", lessons: [
      { id:"mt-01", t:"Il tuo hAP ax²: cosa hai davvero in mano", s:"CPU, memoria, porte, radio e i limiti fisici che decideranno cosa potrai farci e cosa no.", m:20, ready:true },
      { id:"mt-02", t:"RouterOS, RouterBOOT e i livelli di licenza", s:"Due software diversi dentro la stessa scatola, e perché confonderli è il modo più rapido per non riuscire più ad accendere l'apparato.", m:18, ready:true },
      { id:"mt-03", t:"Le quattro strade per entrare, da Mac e da Windows", s:"WinBox, WebFig, SSH e l'accesso via MAC: quale usare, quando, e quello che ti salva quando hai perso l'indirizzo IP.", m:26, ready:true },
      { id:"mt-04", t:"La rete di sicurezza: Safe Mode, backup, export", s:"La lezione più importante del modulo. Da qui in poi puoi sbagliare qualsiasi cosa e tornare indietro in tre secondi.", m:28, ready:true },
      { id:"mt-05", t:"Reset e recupero: quando ti sei chiuso fuori", s:"I tempi esatti del pulsante di reset, il Netinstall dalla VM Windows, e cosa fare prima di andare nel panico.", m:24, ready:true }
    ]},
    { title: "Orientarsi in RouterOS", lessons: [
      { id:"mt-06", t:"La mappa del menu: dove vive ogni cosa", s:"L'albero di RouterOS spiegato una volta per tutte, così smetti di cercare e inizi a sapere dove andare.", m:24, ready:true },
      { id:"mt-07", t:"La riga di comando: print, find, where", s:"Dieci minuti che ti fanno risparmiare ore. La CLI di RouterOS è una lingua piccola e regolarissima.", m:26, ready:true },
      { id:"mt-08", t:"La configurazione predefinita, letta riga per riga", s:"Cosa c'è davvero dentro un hAP ax² appena tolto dalla scatola, e perché va capita prima di cambiarla.", m:28, ready:true },
      { id:"mt-09", t:"Aggiornare RouterOS e RouterBOOT senza sorprese", s:"L'ordine giusto, i due aggiornamenti che tutti dimenticano di fare entrambi, e come si torna indietro.", m:22, ready:true }
    ]},
    { title: "La rete di base", lessons: [
      { id:"mt-10", t:"Interfacce e bridge: il primo disegno", s:"Cos'è un bridge su RouterOS, perché non è esattamente uno switch, e come si decide cosa ci va dentro.", m:24, ready:false },
      { id:"mt-11", t:"Indirizzi e rotte", s:"Assegnare indirizzi, leggere la tabella di routing e capire da dove esce ogni pacchetto.", m:22, ready:false },
      { id:"mt-12", t:"DHCP: server e client", s:"Distribuire indirizzi, le prenotazioni statiche, e leggere la lista dei lease per sapere chi c'è in rete.", m:24, ready:false },
      { id:"mt-13", t:"DNS: risolutore, voci statiche, DNS dinamico", s:"Il router come risolutore della rete, i nomi interni, e raggiungere casa senza indirizzo fisso.", m:24, ready:false },
      { id:"mt-14", t:"NAT: uscire su Internet", s:"Il masquerade in una riga, cosa fa davvero, e perché da qui in poi nessuno ti vede più da fuori.", m:24, ready:false }
    ]},
    { title: "Firewall", lessons: [
      { id:"mt-15", t:"Connection tracking e le catene", s:"Come RouterOS decide il destino di un pacchetto. Il concetto che rende ovvio tutto il resto.", m:28, ready:false },
      { id:"mt-16", t:"Il firewall di base che scriverai sempre", s:"Un insieme di regole completo, spiegato riga per riga, da riusare su ogni apparato che configurerai.", m:32, ready:false },
      { id:"mt-17", t:"Address list, RAW e difesa dalle scansioni", s:"Bloccare per elenco invece che per indirizzo, e fermare il traffico spazzatura prima che costi CPU.", m:26, ready:false },
      { id:"mt-18", t:"Pubblicare un servizio: port forward fatto bene", s:"Il dst-nat, il NAT a giro che fa impazzire tutti, e le regole da non scrivere mai.", m:26, ready:false },
      { id:"mt-19", t:"Fasttrack: prestazioni, e cosa ci perdi", s:"Perché senza fasttrack un ax² non regge il gigabit, e cosa smette di funzionare quando lo accendi.", m:22, ready:false }
    ]},
    { title: "VLAN e switching", lessons: [
      { id:"mt-20", t:"Chip switch e bridge: cosa cambia davvero", s:"Due modi diversi di far passare i frame nello stesso apparato, e come si sceglie fra loro.", m:26, ready:false },
      { id:"mt-21", t:"Bridge VLAN filtering: il punto dove sbagliano tutti", s:"La configurazione che chiude fuori più tecnici di qualsiasi altra, con l'ordine esatto dei passaggi per non farlo.", m:34, ready:false },
      { id:"mt-22", t:"Tag, PVID, ingresso e uscita", s:"Cosa succede a un frame in ogni punto del percorso, disegnato passo per passo.", m:28, ready:false },
      { id:"mt-23", t:"Hardware offload: averlo, e perderlo senza accorgersene", s:"La differenza fra 940 Mbit/s e 180. Quali configurazioni lo spengono in silenzio.", m:24, ready:false },
      { id:"mt-24", t:"Rete ospiti e IoT isolate", s:"Il primo progetto completo: tre reti separate sullo stesso apparato, con le regole giuste fra loro.", m:28, ready:false }
    ]},
    { title: "Wi-Fi 6", lessons: [
      { id:"mt-25", t:"Il pacchetto wifi: canali, larghezza, potenza", s:"Perché sull'ax² il menu wireless classico non esiste, e come si sceglie un canale con criterio.", m:28, ready:false },
      { id:"mt-26", t:"Più SSID su VLAN diverse", s:"Una rete per la famiglia, una per gli ospiti, una per i dispositivi: tutte sulla stessa radio.", m:26, ready:false },
      { id:"mt-27", t:"WPA2, WPA3 e l'autenticazione con RADIUS", s:"Password condivisa contro credenziali personali, e come si collega il router a un server RADIUS.", m:26, ready:false },
      { id:"mt-28", t:"CAPsMAN: governare più access point", s:"Configurare una volta sola e distribuire a tutti gli apparati. Il passo che separa la casa dall'azienda.", m:28, ready:false }
    ]},
    { title: "VPN", lessons: [
      { id:"mt-29", t:"WireGuard: la VPN che userai davvero", s:"Veloce, semplice, moderna. In venti minuti hai un tunnel funzionante e capisci esattamente perché funziona.", m:30, ready:false },
      { id:"mt-30", t:"Raggiungere casa dal Mac e dall'iPhone", s:"Il profilo client, il codice QR, il routing selettivo e il DNS dentro il tunnel.", m:26, ready:false },
      { id:"mt-31", t:"IPsec site-to-site verso un altro apparato", s:"Lo standard che incontri in azienda: fasi, proposte, selettori, e i punti esatti in cui non sale.", m:34, ready:false },
      { id:"mt-32", t:"L2TP/IPsec e OpenVPN: quando servono ancora", s:"I protocolli che trovi già installati dai clienti e che devi saper far funzionare.", m:24, ready:false },
      { id:"mt-33", t:"EoIP e GRE: estendere una rete", s:"Portare una VLAN da una parte all'altra di Internet, e perché farlo con molta prudenza.", m:24, ready:false }
    ]},
    { title: "Traffico: QoS e multi-WAN", lessons: [
      { id:"mt-34", t:"Queue simple e queue tree", s:"Limitare, garantire e dare priorità, con il disegno di cosa succede davvero alla coda.", m:28, ready:false },
      { id:"mt-35", t:"Bufferbloat: la lentezza che nessuno misura", s:"Perché la videochiamata si rompe mentre parte un backup, anche con la fibra. E come si risolve in due righe.", m:26, ready:false },
      { id:"mt-36", t:"Mangle e policy routing", s:"Marcare il traffico e mandarlo dove vuoi tu invece che dove dice la tabella di routing.", m:30, ready:false },
      { id:"mt-37", t:"Due linee: failover e bilanciamento", s:"Passare sulla riserva quando la principale cade, e accorgersi davvero che è caduta.", m:30, ready:false }
    ]},
    { title: "Monitoraggio e automazione", lessons: [
      { id:"mt-38", t:"Log, SNMP e grafici", s:"Vedere cosa è successo alle tre di notte invece di provare a indovinarlo.", m:24, ready:false },
      { id:"mt-39", t:"Netwatch e scheduler", s:"Far reagire il router da solo: controlli periodici, azioni automatiche e avvisi.", m:24, ready:false },
      { id:"mt-40", t:"Scripting RouterOS", s:"Il linguaggio interno: variabili, cicli, condizioni, con gli script che userai davvero.", m:30, ready:false },
      { id:"mt-41", t:"API e Python dal Mac", s:"Configurare venti apparati senza aprire venti finestre. È qui che inizia il lavoro da senior.", m:32, ready:false },
      { id:"mt-42", t:"Backup automatici e versionamento con git", s:"La configurazione come codice: ogni modifica tracciata, confrontabile e recuperabile.", m:28, ready:false }
    ]},
    { title: "Da senior", lessons: [
      { id:"mt-43", t:"Il packet flow: l'ordine in cui RouterOS decide", s:"Il diagramma che spiega ogni comportamento strano che incontrerai. Lo studi una volta e lo usi per sempre.", m:32, ready:false },
      { id:"mt-44", t:"Sniffer, torch e Wireshark dal Mac", s:"Guardare il traffico vero invece di fare ipotesi, con la cattura che arriva in diretta sul tuo portatile.", m:28, ready:false },
      { id:"mt-45", t:"Messa in sicurezza completa", s:"La lista di controllo da applicare a ogni apparato prima di consegnarlo a un cliente.", m:30, ready:false },
      { id:"mt-46", t:"Container su ARM64", s:"Far girare software dentro il router. Cosa ci sta davvero nei 128 MB dell'ax² e cosa no.", m:26, ready:false },
      { id:"mt-47", t:"Progetto finale: la rete completa", s:"Tutto insieme: VLAN, Wi-Fi, firewall, VPN, QoS, monitoraggio e documentazione. Da consegnare a te stesso.", m:40, ready:false }
    ]}
  ]
},
{
  id: "fg", n: "FG", key: "fg", label: "Modulo Fortinet",
  title: "FortiGate e FortiOS",
  subtitle: "Pratico · il firewall di ogni giorno",
  blurb: "Il firewall che trovi più spesso dai clienti. Si parte dal problema vero — «accedo e non so dove guardare» — e si arriva a costruirne uno da zero e a diagnosticarlo con metodo invece che per tentativi.",
  outcome: "Sai orientarti in FortiOS, leggere un log e capire chi ha bloccato cosa, collocare un guasto sull'anello giusto della catena, costruire policy, NAT, VPN e profili di ispezione, e dimostrare con i contatori che una modifica ha davvero effetto.",
  hours: "60–80 ore",
  chapters: [
    { title: "Orientarsi", lessons: [
      { id:"fg-01", t:"Cos'è un FortiGate e com'è fatto dentro", s:"Hardware, licenze, servizi in abbonamento: cosa stai amministrando davvero e cosa smette di funzionare quando scade qualcosa.", m:24, ready:true },
      { id:"fg-02", t:"La mappa della GUI: dove vive ogni cosa", s:"Il menu di FortiOS spiegato una volta per tutte, e la regola che ti fa trovare da solo anche ciò che non hai mai usato.", m:28, ready:true },
      { id:"fg-03", t:"La riga di comando: config, edit, set, next, end", s:"Cinque parole e una struttura ad albero. Dopo questa lezione leggi e scrivi qualsiasi configurazione FortiOS.", m:28, ready:true },
      { id:"fg-04", t:"Il primo giro su un apparato che non conosci", s:"I dieci comandi da dare quando ti mettono davanti un firewall di cui non sai niente, e in che ordine.", m:26, ready:true },
      { id:"fg-05", t:"Leggere i log: ogni campo, cosa significa", s:"La lezione che risolve «non so interpretare i dati». Campo per campo, con il significato diagnostico di ciascuno.", m:30, ready:true }
    ]},
    { title: "Il metodo diagnostico", lessons: [
      { id:"fg-06", t:"La catena dei sette anelli", s:"Quasi ogni ticket è «non riesco a raggiungere X». Il metodo che colloca il guasto invece di provare rimedi a caso.", m:28, ready:false },
      { id:"fg-07", t:"Anelli 1 e 2: client, rete locale, routing e selettori", s:"Sovrapposizioni di indirizzi, proxy sul dispositivo, rotte che puntano dove non c'è nessuno.", m:30, ready:false },
      { id:"fg-08", t:"Anelli 3, 4 e 5: policy, servizio, NAT", s:"La coppia di interfacce, l'oggetto servizio troppo stretto, il NAT che manca. Le tre cause più frequenti in assoluto.", m:30, ready:false },
      { id:"fg-09", t:"Anelli 6 e 7: ispezione e destinazione", s:"Quando a bloccare non è la regola ma il motore di ispezione — e quando il problema non è affatto tuo.", m:28, ready:false }
    ]},
    { title: "Costruire", lessons: [
      { id:"fg-10", t:"Interfacce, zone e VLAN", s:"Come FortiOS vede la rete, e perché una zona che non contiene un tunnel è la trappola più silenziosa.", m:28, ready:false },
      { id:"fg-11", t:"Gli oggetti: indirizzi, servizi, pianificazioni", s:"Le convenzioni di nome che rendono una configurazione manutenibile, e la regola sugli oggetti condivisi.", m:26, ready:false },
      { id:"fg-12", t:"Le policy: coppia di interfacce e deny implicito", s:"Il principio che genera più ticket di tutti, e il più controintuitivo per chi non ha formazione di rete.", m:32, ready:false },
      { id:"fg-13", t:"NAT: SNAT, DNAT e i VIP", s:"Mascherare in uscita, pubblicare in ingresso, e la coerenza fra VIP e oggetto servizio.", m:30, ready:false },
      { id:"fg-14", t:"Routing: statiche, distanza, priorità, multi-WAN", s:"Come si decide da dove esce un pacchetto, e come si legge una tabella di routing senza fare ipotesi.", m:28, ready:false }
    ]},
    { title: "Pubblicare servizi", lessons: [
      { id:"fg-15", t:"VIP e port forward fatti bene", s:"La procedura completa, con le sole porte necessarie e il collaudo che dimostra che funziona.", m:28, ready:false },
      { id:"fg-16", t:"Gli errori di pubblicazione che pagano tutti", s:"Porta del VIP che non combacia col servizio, due VIP sullo stesso indirizzo, regole che nessuno raggiunge.", m:26, ready:false },
      { id:"fg-17", t:"Restrizioni per sorgente e geolocalizzazione", s:"Chiudere per paese o per indirizzo, e perché il test fatto dalla tua sede non dimostra niente.", m:26, ready:false }
    ]},
    { title: "VPN", lessons: [
      { id:"fg-18", t:"SSL-VPN: impostazioni, portale, pool, policy", s:"L'accesso remoto degli utenti, e il pezzo che tutti dimenticano: entrare nella VPN non significa arrivare da qualche parte.", m:32, ready:false },
      { id:"fg-19", t:"IPsec site-to-site: fase 1, fase 2, selettori", s:"Il tunnel fra due sedi costruito da zero, con i parametri che devono coincidere e quelli che no.", m:34, ready:false },
      { id:"fg-20", t:"Quando un tunnel non sale", s:"I comandi che dicono esattamente a quale passo si è fermata la negoziazione, e cosa significa ciascun messaggio.", m:30, ready:false },
      { id:"fg-21", t:"Il tunnel è su ma il traffico non passa", s:"Selettori, rotte, policy e MTU: le quattro cause, in ordine di frequenza, e come si distinguono.", m:30, ready:false },
      { id:"fg-22", t:"VPN e NAT: quando la sorgente non è accettabile", s:"Il caso in cui devi tradurre l'indirizzo per essere ammesso dall'altra parte, e i pacchetti scartati in silenzio.", m:28, ready:false }
    ]},
    { title: "Ispezione e UTM", lessons: [
      { id:"fg-23", t:"Come funziona l'ispezione: certificato o completa", s:"Le due modalità, cosa vede ciascuna, e perché sceglierne una è una decisione e non un interruttore.", m:30, ready:false },
      { id:"fg-24", t:"Filtro web e filtro DNS, e quando si contraddicono", s:"Il caso più istruttivo che esista: due livelli che dicono cose opposte sullo stesso traffico.", m:30, ready:false },
      { id:"fg-25", t:"allow non è exempt: l'errore classico", s:"Perché una lista di eccezioni scritta bene continua a non sbloccare niente.", m:24, ready:false },
      { id:"fg-26", t:"Antivirus, IPS e controllo applicativo", s:"Cosa ispezionano davvero, e il caso dell'antivirus configurato ma di fatto cieco.", m:28, ready:false },
      { id:"fg-27", t:"Leggere un log UTM e capire chi ha bloccato", s:"Distinguere in tre secondi se a fermare il traffico è stata la policy o un motore di ispezione.", m:26, ready:false }
    ]},
    { title: "Diagnosi avanzata", lessons: [
      { id:"fg-28", t:"Catturare il traffico: diagnose sniffer packet", s:"Vedere i pacchetti veri sull'apparato, con i filtri giusti e la trappola che genera falsi positivi.", m:30, ready:false },
      { id:"fg-29", t:"Seguire un pacchetto: diagnose debug flow", s:"Lo strumento che mostra la decisione del firewall passo per passo. Il più potente e il più sottoutilizzato.", m:32, ready:false },
      { id:"fg-30", t:"Le sessioni: cosa sta passando adesso", s:"Filtrare, leggere e interpretare la tabella delle sessioni, e il filtro che resta impostato e inganna.", m:26, ready:false },
      { id:"fg-31", t:"Dimostrare che il firewall è fuori causa", s:"Come si prova — con i contatori, non con le opinioni — che il problema è da un'altra parte.", m:28, ready:false }
    ]},
    { title: "Gestione quotidiana", lessons: [
      { id:"fg-32", t:"Log e storico: e cosa fare quando non c'è", s:"Dove finiscono i log, quanto durano, e perché senza storico ogni ticket retrospettivo è cieco.", m:26, ready:false },
      { id:"fg-33", t:"Monitoraggio e automazioni, con le loro trappole", s:"Controlli periodici e azioni automatiche che falliscono in silenzio da mesi senza che nessuno se ne accorga.", m:28, ready:false },
      { id:"fg-34", t:"Backup, aggiornamenti e rollback", s:"La procedura ripetibile, la finestra di intervento e il ritorno indietro scritto prima di partire.", m:28, ready:false },
      { id:"fg-35", t:"La messa in sicurezza: la lista di controllo", s:"I rilievi che ricorrono su apparati e clienti diversi, raccolti in una lista da applicare a ogni presa in carico.", m:30, ready:false }
    ]},
    { title: "Da senior", lessons: [
      { id:"fg-36", t:"Costruire un FortiGate da zero: gli undici passi", s:"Dalla scatola alla consegna, in ordine di dipendenza, con la verifica a ogni passo.", m:36, ready:false },
      { id:"fg-37", t:"Rischio operativo, finestre e rollback", s:"Le quattro domande da farsi prima di ogni modifica su un apparato che sta lavorando.", m:26, ready:false },
      { id:"fg-38", t:"Prendere in carico un apparato che non conosci", s:"Il metodo completo: perimetro, inventario, rilievi, priorità e cosa dire al cliente.", m:32, ready:false }
    ]}
  ]
},
{
  id: "sw", n: "SW", key: "sw", label: "Modulo Switching",
  title: "Switching pratico",
  subtitle: "Laboratorio da tavolo",
  blurb: "Uno switch gestito vero sulla scrivania, accanto al MikroTik. Qui i concetti di commutazione smettono di essere disegni: costruisci VLAN, trunk e aggregazioni con due apparati collegati, provochi un loop di proposito e guardi il traffico con Wireshark.",
  outcome: "Sai progettare e configurare VLAN con tag su qualsiasi switch gestito, costruire un trunk verso un router, catturare traffico con il port mirroring, riconoscere un loop e — soprattutto — sai dire a un cliente quando un apparato non è lo strumento giusto.",
  hours: "25–35 ore",
  chapters: [
    { title: "L'apparato e il metodo", lessons: [
      { id:"sw-01", t:"Cosa hai in mano: e cosa questo switch non sa fare", s:"Le funzioni reali del TL-SG605E, i suoi limiti dichiarati, e perché conoscerli è già una competenza da senior.", m:22, ready:true },
      { id:"sw-02", t:"Primo accesso dal Mac, e la rete di sicurezza", s:"Trovarlo, entrarci, salvare la configurazione e sapere come tornare indietro prima di toccare qualsiasi cosa.", m:24, ready:true },
      { id:"sw-03", t:"Le porte: negoziazione, statistiche, contatori d'errore", s:"Leggere cosa passa davvero da ogni porta, e riconoscere un problema fisico dai numeri prima che diventi un ticket.", m:26, ready:true },
      { id:"sw-04", t:"Diagnostica del cavo: trovare il guasto senza scale", s:"Lo strumento che ti dice se un cavo è interrotto e a quanti metri. Nessuno lo usa, e risolve da solo una categoria di ticket.", m:22, ready:true }
    ]},
    { title: "VLAN, sul serio", lessons: [
      { id:"sw-05", t:"Le tre modalità VLAN, e quale usare davvero", s:"Port-based, MTU VLAN e 802.1Q: due sono scorciatoie proprietarie, una è lo standard che troverai ovunque.", m:26, ready:false },
      { id:"sw-06", t:"802.1Q: tag, untag e PVID, con i frame disegnati", s:"Cosa succede a un frame in ogni punto del percorso. Il concetto che vale identico su Cisco, MikroTik e chiunque altro.", m:30, ready:false },
      { id:"sw-07", t:"Il primo laboratorio: due VLAN e un trunk verso il MikroTik", s:"Due apparati, un cavo, due reti separate. Da qui in poi la teoria delle VLAN diventa una cosa che hai costruito.", m:34, ready:false },
      { id:"sw-08", t:"Far parlare le VLAN fra loro: router su uno stecco", s:"Le VLAN separano; per farle comunicare serve un router. Con le regole che decidono chi può parlare con chi.", m:30, ready:false },
      { id:"sw-09", t:"Gli errori di VLAN che fanno tutti, riprodotti di proposito", s:"PVID sbagliato, trunk che non passa il tag, VLAN di gestione dimenticata: li provochi tu, così li riconosci al volo.", m:28, ready:false }
    ]},
    { title: "Vedere il traffico", lessons: [
      { id:"sw-10", t:"Port mirroring: catturare con Wireshark dal Mac", s:"Copiare il traffico di una porta verso il tuo portatile. Lo strumento che trasforma le ipotesi in prove.", m:28, ready:false },
      { id:"sw-11", t:"Loop e tempeste di broadcast, provocati e risolti", s:"Colleghi due porte fra loro e guardi una rete morire in tre secondi. Poi impari a impedirlo.", m:26, ready:false }
    ]},
    { title: "Prestazioni e limiti", lessons: [
      { id:"sw-12", t:"Aggregare due collegamenti in uno", s:"Raddoppiare la banda fra due apparati, e capire perché non sempre funziona come ci si aspetta.", m:26, ready:false },
      { id:"sw-13", t:"QoS, limitazione di banda e IGMP snooping", s:"Dare priorità, mettere un tetto, e impedire che un flusso video allaghi tutta la rete.", m:26, ready:false },
      { id:"sw-14", t:"I limiti dell'apparato, e cosa dire a un cliente", s:"Riconoscere quando uno switch non è lo strumento giusto e saperlo spiegare. È qui che si vede il livello senior.", m:26, ready:false }
    ]}
  ]
}
];




/* --- Indice piatto, usato da nav, ricerca, prev/next --- */
window.NETPATH_FLAT = (function () {
  var out = [], c = window.NETPATH_CURRICULUM;
  for (var i = 0; i < c.length; i++) {
    for (var j = 0; j < c[i].chapters.length; j++) {
      for (var k = 0; k < c[i].chapters[j].lessons.length; k++) {
        var L = c[i].chapters[j].lessons[k];
        out.push({
          id: L.id, t: L.t, s: L.s, m: L.m, ready: L.ready,
          level: c[i].id, levelN: c[i].n, levelTitle: c[i].title,
          chapter: c[i].chapters[j].title,
          href: "lezioni/" + L.id + ".html"
        });
      }
    }
  }
  return out;
})();

// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.
const Alexa = require('ask-sdk-core');

const pokemon_types = { "PKMN001":["Grass","Poison"], "PKMN002":["Grass","Poison"], "PKMN003":["Grass","Poison"], "PKMN004":["Fire"], "PKMN005":["Fire"], "PKMN006":["Fire","Flying"], "PKMN007":["Water"], "PKMN008":["Water"], "PKMN009":["Water"], "PKMN010":["Bug"], "PKMN011":["Bug"], "PKMN012":["Bug","Flying"], "PKMN013":["Bug","Poison"], "PKMN014":["Bug","Poison"], "PKMN015":["Bug","Poison"], "PKMN016":["Normal","Flying"], "PKMN017":["Normal","Flying"], "PKMN018":["Normal","Flying"], "PKMN019":["Normal"], "PKMN020":["Normal"], "PKMN021":["Normal","Flying"], "PKMN022":["Normal","Flying"], "PKMN023":["Poison"], "PKMN024":["Poison"], "PKMN025":["Electric"], "PKMN026":["Electric"], "PKMN027":["Ground"], "PKMN028":["Ground"], "PKMN029":["Poison"], "PKMN030":["Poison"], "PKMN031":["Poison","Ground"], "PKMN032":["Poison"], "PKMN033":["Poison"], "PKMN034":["Poison","Ground"], "PKMN035":["Fairy"], "PKMN036":["Fairy"], "PKMN037":["Fire"], "PKMN038":["Fire"], "PKMN039":["Normal","Fairy"], "PKMN040":["Normal","Fairy"], "PKMN041":["Poison","Flying"], "PKMN042":["Poison","Flying"], "PKMN043":["Grass","Poison"], "PKMN044":["Grass","Poison"], "PKMN045":["Grass","Poison"], "PKMN046":["Bug","Grass"], "PKMN047":["Bug","Grass"], "PKMN048":["Bug","Poison"], "PKMN049":["Bug","Poison"], "PKMN050":["Ground"], "PKMN051":["Ground"], "PKMN052":["Normal"], "PKMN053":["Normal"], "PKMN054":["Water"], "PKMN055":["Water"], "PKMN056":["Fighting"], "PKMN057":["Fighting"], "PKMN058":["Fire"], "PKMN059":["Fire"], "PKMN060":["Water"], "PKMN061":["Water"], "PKMN062":["Water","Fighting"], "PKMN063":["Psychic"], "PKMN064":["Psychic"], "PKMN065":["Psychic"], "PKMN066":["Fighting"], "PKMN067":["Fighting"], "PKMN068":["Fighting"], "PKMN069":["Grass","Poison"], "PKMN070":["Grass","Poison"], "PKMN071":["Grass","Poison"], "PKMN072":["Water","Poison"], "PKMN073":["Water","Poison"], "PKMN074":["Rock","Ground"], "PKMN075":["Rock","Ground"], "PKMN076":["Rock","Ground"], "PKMN077":["Fire"], "PKMN078":["Fire"], "PKMN079":["Water","Psychic"], "PKMN080":["Water","Psychic"], "PKMN081":["Electric","Steel"], "PKMN082":["Electric","Steel"], "PKMN083":["Normal","Flying"], "PKMN084":["Normal","Flying"], "PKMN085":["Normal","Flying"], "PKMN086":["Water"], "PKMN087":["Water","Ice"], "PKMN088":["Poison"], "PKMN089":["Poison"], "PKMN090":["Water"], "PKMN091":["Water","Ice"], "PKMN092":["Ghost","Poison"], "PKMN093":["Ghost","Poison"], "PKMN094":["Ghost","Poison"], "PKMN095":["Rock","Ground"], "PKMN096":["Psychic"], "PKMN097":["Psychic"], "PKMN098":["Water"], "PKMN099":["Water"], "PKMN100":["Electric"], "PKMN101":["Electric"], "PKMN102":["Grass","Psychic"], "PKMN103":["Grass","Psychic"], "PKMN104":["Ground"], "PKMN105":["Ground"], "PKMN106":["Fighting"], "PKMN107":["Fighting"], "PKMN108":["Normal"], "PKMN109":["Poison"], "PKMN110":["Poison"], "PKMN111":["Ground","Rock"], "PKMN112":["Ground","Rock"], "PKMN113":["Normal"], "PKMN114":["Grass"], "PKMN115":["Normal"], "PKMN116":["Water"], "PKMN117":["Water"], "PKMN118":["Water"], "PKMN119":["Water"], "PKMN120":["Water"], "PKMN121":["Water","Psychic"], "PKMN122":["Psychic","Fairy"], "PKMN123":["Bug","Flying"], "PKMN124":["Ice","Psychic"], "PKMN125":["Electric"], "PKMN126":["Fire"], "PKMN127":["Bug"], "PKMN128":["Normal"], "PKMN129":["Water"], "PKMN130":["Water","Flying"], "PKMN131":["Water","Ice"], "PKMN132":["Normal"], "PKMN133":["Normal"], "PKMN134":["Water"], "PKMN135":["Electric"], "PKMN136":["Fire"], "PKMN137":["Normal"], "PKMN138":["Rock","Water"], "PKMN139":["Rock","Water"], "PKMN140":["Rock","Water"], "PKMN141":["Rock","Water"], "PKMN142":["Rock","Flying"], "PKMN143":["Normal"], "PKMN144":["Ice","Flying"], "PKMN145":["Electric", "Flying"], "PKMN146":["Fire","Flying"], "PKMN147":["Dragon"], "PKMN148":["Dragon"], "PKMN149":["Dragon","Flying"], "PKMN150":["Psychic"], "PKMN151":["Psychic"], "PKMN152":["Grass"], "PKMN153":["Grass"], "PKMN154":["Grass"], "PKMN155":["Fire"], "PKMN156":["Fire"], "PKMN157":["Fire"], "PKMN158":["Water"], "PKMN159":["Water"], "PKMN160":["Water"], "PKMN161":["Normal"], "PKMN162":["Normal"], "PKMN163":["Normal","Flying"], "PKMN164":["Normal","Flying"], "PKMN165":["Bug","Flying"], "PKMN166":["Bug","Flying"], "PKMN167":["Bug","Poison"], "PKMN168":["Bug","Poison"], "PKMN169":["Poison","Flying"], "PKMN170":["Water","Electric"], "PKMN171":["Water","Electric"], "PKMN172":["Electric"], "PKMN173":["Fairy"], "PKMN174":["Normal","Fairy"], "PKMN175":["Fairy"], "PKMN176":["Fairy","Flying"], "PKMN177":["Psychic","Flying"], "PKMN178":["Psychic","Flying"], "PKMN179":["Electric"], "PKMN180":["Electric"], "PKMN181":["Electric"], "PKMN182":["Grass"], "PKMN183":["Water","Fairy"], "PKMN184":["Water","Fairy"], "PKMN185":["Rock"], "PKMN186":["Water"], "PKMN187":["Grass","Flying"], "PKMN188":["Grass","Flying"], "PKMN189":["Grass","Flying"], "PKMN190":["Normal"], "PKMN191":["Grass"], "PKMN192":["Grass"], "PKMN193":["Bug","Flying"], "PKMN194":["Water","Ground"], "PKMN195":["Water","Ground"], "PKMN196":["Psychic"], "PKMN197":["Dark"], "PKMN198":["Dark","Flying"], "PKMN199":["Water","Psychic"], "PKMN200":["Ghost"], "PKMN201":["Psychic"], "PKMN202":["Psychic"], "PKMN203":["Normal","Psychic"], "PKMN204":["Bug"], "PKMN205":["Bug","Steel"], "PKMN206":["Normal"], "PKMN207":["Ground","Flying"], "PKMN208":["Steel","Ground"], "PKMN209":["Fairy"], "PKMN210":["Fairy"], "PKMN211":["Water","Poison"], "PKMN212":["Bug","Steel"], "PKMN213":["Bug","Rock"], "PKMN214":["Bug","Fighting"], "PKMN215":["Dark","Ice"], "PKMN216":["Normal"], "PKMN217":["Normal"], "PKMN218":["Fire"], "PKMN219":["Fire","Rock"], "PKMN220":["Ice","Ground"], "PKMN221":["Ice","Ground"], "PKMN222":["Water","Rock"], "PKMN223":["Water"], "PKMN224":["Water"], "PKMN225":["Ice","Flying"], "PKMN226":["Water","Flying"], "PKMN227":["Steel","Flying"], "PKMN228":["Dark","Fire"], "PKMN229":["Dark","Fire"], "PKMN230":["Water","Dragon"], "PKMN231":["Ground"], "PKMN232":["Ground"], "PKMN233":["Normal"], "PKMN234":["Normal"], "PKMN235":["Normal"], "PKMN236":["Fighting"], "PKMN237":["Fighting"], "PKMN238":["Ice","Psychic"], "PKMN239":["Electric"], "PKMN240":["Fire"], "PKMN241":["Normal"], "PKMN242":["Normal"], "PKMN243":["Electric"], "PKMN244":["Fire"], "PKMN245":["Water"], "PKMN246":["Rock","Ground"], "PKMN247":["Rock","Ground"], "PKMN248":["Rock","Dark"], "PKMN249":["Psychic","Flying"], "PKMN250":["Fire","Flying"], "PKMN251":["Psychic","Grass"], "PKMN252":["Grass"], "PKMN253":["Grass"], "PKMN254":["Grass"], "PKMN255":["Fire"], "PKMN256":["Fire","Fighting"], "PKMN257":["Fire","Fighting"], "PKMN258":["Water"], "PKMN259":["Water","Ground"], "PKMN260":["Water","Ground"], "PKMN261":["Dark"], "PKMN262":["Dark"], "PKMN263":["Normal"], "PKMN264":["Normal"], "PKMN265":["Bug"], "PKMN266":["Bug"], "PKMN267":["Bug","Flying"], "PKMN268":["Bug"], "PKMN269":["Bug","Poison"], "PKMN270":["Water","Grass"], "PKMN271":["Water","Grass"], "PKMN272":["Water","Grass"], "PKMN273":["Grass"], "PKMN274":["Grass","Dark"], "PKMN275":["Grass","Dark"], "PKMN276":["Normal","Flying"], "PKMN277":["Normal","Flying"], "PKMN278":["Water","Flying"], "PKMN279":["Water","Flying"], "PKMN280":["Psychic","Fairy"], "PKMN281":["Psychic","Fairy"], "PKMN282":["Psychic","Fairy"], "PKMN283":["Bug","Water"], "PKMN284":["Bug","Flying"], "PKMN285":["Grass"], "PKMN286":["Grass","Fighting"], "PKMN287":["Normal"], "PKMN288":["Normal"], "PKMN289":["Normal"], "PKMN290":["Bug","Ground"], "PKMN291":["Bug","Flying"], "PKMN292":["Bug","Ghost"], "PKMN293":["Normal"], "PKMN294":["Normal"], "PKMN295":["Normal"], "PKMN296":["Fighting"], "PKMN297":["Fighting"], "PKMN298":["Normal","Fairy"], "PKMN299":["Rock"], "PKMN300":["Normal"], "PKMN301":["Normal"], "PKMN302":["Dark","Ghost"], "PKMN303":["Steel","Fairy"], "PKMN304":["Steel","Rock"], "PKMN305":["Steel","Rock"], "PKMN306":["Steel","Rock"], "PKMN307":["Fighting","Psychic"], "PKMN308":["Fighting","Psychic"], "PKMN309":["Electric"], "PKMN310":["Electric"], "PKMN311":["Electric"], "PKMN312":["Electric"], "PKMN313":["Bug"], "PKMN314":["Bug"], "PKMN315":["Grass","Poison"], "PKMN316":["Poison"], "PKMN317":["Poison"], "PKMN318":["Water","Dark"], "PKMN319":["Water","Dark"], "PKMN320":["Water"], "PKMN321":["Water"], "PKMN322":["Fire","Ground"], "PKMN323":["Fire","Ground"], "PKMN324":["Fire"], "PKMN325":["Psychic"], "PKMN326":["Psychic"], "PKMN327":["Normal"], "PKMN328":["Ground"], "PKMN329":["Ground","Dragon"], "PKMN330":["Ground","Dragon"], "PKMN331":["Grass"], "PKMN332":["Grass","Dark"], "PKMN333":["Normal","Flying"], "PKMN334":["Dragon","Flying"], "PKMN335":["Normal"], "PKMN336":["Poison"], "PKMN337":["Rock","Psychic"], "PKMN338":["Rock","Psychic"], "PKMN339":["Water","Ground"], "PKMN340":["Water","Ground"], "PKMN341":["Water"], "PKMN342":["Water","Dark"], "PKMN343":["Ground","Psychic"], "PKMN344":["Ground","Psychic"], "PKMN345":["Rock","Grass"], "PKMN346":["Rock","Grass"], "PKMN347":["Rock","Bug"], "PKMN348":["Rock","Bug"], "PKMN349":["Water"], "PKMN350":["Water"], "PKMN351":["Normal"], "PKMN352":["Normal"], "PKMN353":["Ghost"], "PKMN354":["Ghost"], "PKMN355":["Ghost"], "PKMN356":["Ghost"], "PKMN357":["Grass","Flying"], "PKMN358":["Psychic"], "PKMN359":["Dark"], "PKMN360":["Psychic"], "PKMN361":["Ice"], "PKMN362":["Ice"], "PKMN363":["Ice","Water"], "PKMN364":["Ice","Water"], "PKMN365":["Ice","Water"], "PKMN366":["Water"], "PKMN367":["Water"], "PKMN368":["Water"], "PKMN369":["Water","Rock"], "PKMN370":["Water"], "PKMN371":["Dragon"], "PKMN372":["Dragon"], "PKMN373":["Dragon","Flying"], "PKMN374":["Steel","Psychic"], "PKMN375":["Steel","Psychic"], "PKMN376":["Steel","Psychic"], "PKMN377":["Rock"], "PKMN378":["Ice"], "PKMN379":["Steel"], "PKMN380":["Dragon","Psychic"], "PKMN381":["Dragon","Psychic"], "PKMN382":["Water"], "PKMN383":["Ground"], "PKMN384":["Dragon","Flying"], "PKMN385":["Steel","Psychic"], "PKMN386":["Psychic"], "PKMN387":["Grass"], "PKMN388":["Grass"], "PKMN389":["Grass","Ground"], "PKMN390":["Fire"], "PKMN391":["Fire","Fighting"], "PKMN392":["Fire","Fighting"], "PKMN393":["Water"], "PKMN394":["Water"], "PKMN395":["Water","Steel"], "PKMN396":["Normal","Flying"], "PKMN397":["Normal","Flying"], "PKMN398":["Normal","Flying"], "PKMN399":["Normal"], "PKMN400":["Normal","Water"], "PKMN401":["Bug"], "PKMN402":["Bug"], "PKMN403":["Electric"], "PKMN404":["Electric"], "PKMN405":["Electric"], "PKMN406":["Grass","Poison"], "PKMN407":["Grass","Poison"], "PKMN408":["Rock"], "PKMN409":["Rock"], "PKMN410":["Rock","Steel"], "PKMN411":["Rock","Steel"], "PKMN412":["Bug"], "PKMN413":["Bug","Grass"], "PKMN414":["Bug","Flying"], "PKMN415":["Bug","Flying"], "PKMN416":["Bug","Flying"], "PKMN417":["Electric"], "PKMN418":["Water"], "PKMN419":["Water"], "PKMN420":["Grass"], "PKMN421":["Grass"], "PKMN422":["Water"], "PKMN423":["Water","Ground"], "PKMN424":["Normal"], "PKMN425":["Ghost","Flying"], "PKMN426":["Ghost","Flying"], "PKMN427":["Normal"], "PKMN428":["Normal"], "PKMN429":["Ghost"], "PKMN430":["Dark","Flying"], "PKMN431":["Normal"], "PKMN432":["Normal"], "PKMN433":["Psychic"], "PKMN434":["Poison","Dark"], "PKMN435":["Poison","Dark"], "PKMN436":["Steel","Psychic"], "PKMN437":["Steel","Psychic"], "PKMN438":["Rock"], "PKMN439":["Psychic","Fairy"], "PKMN440":["Normal"], "PKMN441":["Normal","Flying"], "PKMN442":["Ghost","Dark"], "PKMN443":["Dragon","Ground"], "PKMN444":["Dragon","Ground"], "PKMN445":["Dragon","Ground"], "PKMN446":["Normal"], "PKMN447":["Fighting"], "PKMN448":["Fighting","Steel"], "PKMN449":["Ground"], "PKMN450":["Ground"], "PKMN451":["Poison","Bug"], "PKMN452":["Poison","Dark"], "PKMN453":["Poison","Fighting"], "PKMN454":["Poison","Fighting"], "PKMN455":["Grass"], "PKMN456":["Water"], "PKMN457":["Water"], "PKMN458":["Water","Flying"], "PKMN459":["Grass","Ice"], "PKMN460":["Grass","Ice"], "PKMN461":["Dark","Ice"], "PKMN462":["Electric","Steel"], "PKMN463":["Normal"], "PKMN464":["Ground","Rock"], "PKMN465":["Grass"], "PKMN466":["Electric"], "PKMN467":["Fire"], "PKMN468":["Fairy","Flying"], "PKMN469":["Bug","Flying"], "PKMN470":["Grass"], "PKMN471":["Ice"], "PKMN472":["Ground","Flying"], "PKMN473":["Ice","Ground"], "PKMN474":["Normal"], "PKMN475":["Psychic","Fighting"], "PKMN476":["Rock","Steel"], "PKMN477":["Ghost"], "PKMN478":["Ice","Ghost"], "PKMN479":["Electric","Ghost"], "PKMN480":["Psychic"], "PKMN481":["Psychic"], "PKMN482":["Psychic"], "PKMN483":["Steel","Dragon"], "PKMN484":["Water","Dragon"], "PKMN485":["Fire","Steel"], "PKMN486":["Normal"], "PKMN487":["Ghost","Dragon"], "PKMN488":["Psychic"], "PKMN489":["Water"], "PKMN490":["Water"], "PKMN491":["Dark"], "PKMN492":["Grass"], "PKMN493":["Normal"], "PKMN494":["Psychic","Fire"], "PKMN495":["Grass"], "PKMN496":["Grass"], "PKMN497":["Grass"], "PKMN498":["Fire"], "PKMN499":["Fire","Fighting"], "PKMN500":["Fire","Fighting"], "PKMN501":["Water"], "PKMN502":["Water"], "PKMN503":["Water"], "PKMN504":["Normal"], "PKMN505":["Normal"], "PKMN506":["Normal"], "PKMN507":["Normal"], "PKMN508":["Normal"], "PKMN509":["Dark"], "PKMN510":["Dark"], "PKMN511":["Grass"], "PKMN512":["Grass"], "PKMN513":["Fire"], "PKMN514":["Fire"], "PKMN515":["Water"], "PKMN516":["Water"], "PKMN517":["Psychic"], "PKMN518":["Psychic"], "PKMN519":["Normal","Flying"], "PKMN520":["Normal","Flying"], "PKMN521":["Normal","Flying"], "PKMN522":["Electric"], "PKMN523":["Electric"], "PKMN524":["Rock"], "PKMN525":["Rock"], "PKMN526":["Rock"], "PKMN527":["Psychic","Flying"], "PKMN528":["Psychic","Flying"], "PKMN529":["Ground"], "PKMN530":["Ground","Steel"], "PKMN531":["Normal"], "PKMN532":["Fighting"], "PKMN533":["Fighting"], "PKMN534":["Fighting"], "PKMN535":["Water"], "PKMN536":["Water","Ground"], "PKMN537":["Water","Ground"], "PKMN538":["Fighting"], "PKMN539":["Fighting"], "PKMN540":["Bug","Grass"], "PKMN541":["Bug","Grass"], "PKMN542":["Bug","Grass"], "PKMN543":["Bug","Poison"], "PKMN544":["Bug","Poison"], "PKMN545":["Bug","Poison"], "PKMN546":["Grass","Fairy"], "PKMN547":["Grass","Fairy"], "PKMN548":["Grass"], "PKMN549":["Grass"], "PKMN550":["Water"], "PKMN551":["Ground","Dark"], "PKMN552":["Ground","Dark"], "PKMN553":["Ground","Dark"], "PKMN554":["Fire"], "PKMN555":["Fire"], "PKMN556":["Grass"], "PKMN557":["Bug","Rock"], "PKMN558":["Bug","Rock"], "PKMN559":["Dark","Fighting"], "PKMN560":["Dark","Fighting"], "PKMN561":["Psychic","Flying"], "PKMN562":["Ghost"], "PKMN563":["Ghost"], "PKMN564":["Water","Rock"], "PKMN565":["Water","Rock"], "PKMN566":["Rock","Flying"], "PKMN567":["Rock","Flying"], "PKMN568":["Poison"], "PKMN569":["Poison"], "PKMN570":["Dark"], "PKMN571":["Dark"], "PKMN572":["Normal"], "PKMN573":["Normal"], "PKMN574":["Psychic"], "PKMN575":["Psychic"], "PKMN576":["Psychic"], "PKMN577":["Psychic"], "PKMN578":["Psychic"], "PKMN579":["Psychic"], "PKMN580":["Water","Flying"], "PKMN581":["Water","Flying"], "PKMN582":["Ice"], "PKMN583":["Ice"], "PKMN584":["Ice"], "PKMN585":["Normal","Grass"], "PKMN586":["Normal","Grass"], "PKMN587":["Electric","Flying"], "PKMN588":["Bug"], "PKMN589":["Bug","Steel"], "PKMN590":["Grass","Poison"], "PKMN591":["Grass","Poison"], "PKMN592":["Water","Ghost"], "PKMN593":["Water","Ghost"], "PKMN594":["Water"], "PKMN595":["Bug","Electric"], "PKMN596":["Bug","Electric"], "PKMN597":["Grass","Steel"], "PKMN598":["Grass","Steel"], "PKMN599":["Steel"], "PKMN600":["Steel"], "PKMN601":["Steel"], "PKMN602":["Electric"], "PKMN603":["Electric"], "PKMN604":["Electric"], "PKMN605":["Psychic"], "PKMN606":["Psychic"], "PKMN607":["Ghost","Fire"], "PKMN608":["Ghost","Fire"], "PKMN609":["Ghost","Fire"], "PKMN610":["Dragon"], "PKMN611":["Dragon"], "PKMN612":["Dragon"], "PKMN613":["Ice"], "PKMN614":["Ice"], "PKMN615":["Ice"], "PKMN616":["Bug"], "PKMN617":["Bug"], "PKMN618":["Ground","Electric"], "PKMN619":["Fighting"], "PKMN620":["Fighting"], "PKMN621":["Dragon"], "PKMN622":["Ground","Ghost"], "PKMN623":["Ground","Ghost"], "PKMN624":["Dark","Steel"], "PKMN625":["Dark","Steel"], "PKMN626":["Normal"], "PKMN627":["Normal","Flying"], "PKMN628":["Normal","Flying"], "PKMN629":["Dark","Flying"], "PKMN630":["Dark","Flying"], "PKMN631":["Fire"], "PKMN632":["Bug","Steel"], "PKMN633":["Dark","Dragon"], "PKMN634":["Dark","Dragon"], "PKMN635":["Dark","Dragon"], "PKMN636":["Bug","Fire"], "PKMN637":["Bug","Fire"], "PKMN638":["Steel","Fighting"], "PKMN639":["Rock","Fighting"], "PKMN640":["Grass","Fighting"], "PKMN641":["Flying"], "PKMN642":["Electric","Flying"], "PKMN643":["Dragon","Fire"], "PKMN644":["Dragon","Electric"], "PKMN645":["Ground","Flying"], "PKMN646":["Dragon","Ice"], "PKMN647":["Water","Fighting"], "PKMN648":["Normal","Psychic"], "PKMN649":["Bug","Steel"], "PKMN650":["Grass"], "PKMN651":["Grass"], "PKMN652":["Grass","Fighting"], "PKMN653":["Fire"], "PKMN654":["Fire"], "PKMN655":["Fire","Psychic"], "PKMN656":["Water"], "PKMN657":["Water"], "PKMN658":["Water","Dark"], "PKMN659":["Normal"], "PKMN660":["Normal","Ground"], "PKMN661":["Normal","Flying"], "PKMN662":["Fire","Flying"], "PKMN663":["Fire","Flying"], "PKMN664":["Bug"], "PKMN665":["Bug"], "PKMN666":["Bug","Flying"], "PKMN667":["Fire","Normal"], "PKMN668":["Fire","Normal"], "PKMN669":["Fairy"], "PKMN670":["Fairy"], "PKMN671":["Fairy"], "PKMN672":["Grass"], "PKMN673":["Grass"], "PKMN674":["Fighting"], "PKMN675":["Fighting","Dark"], "PKMN676":["Normal"], "PKMN677":["Psychic"], "PKMN678":["Psychic"], "PKMN679":["Steel","Ghost"], "PKMN680":["Steel","Ghost"], "PKMN681":["Steel","Ghost"], "PKMN682":["Fairy"], "PKMN683":["Fairy"], "PKMN684":["Fairy"], "PKMN685":["Fairy"], "PKMN686":["Dark","Psychic"], "PKMN687":["Dark","Psychic"], "PKMN688":["Rock","Water"], "PKMN689":["Rock","Water"], "PKMN690":["Poison","Water"], "PKMN691":["Poison","Dragon"], "PKMN692":["Water"], "PKMN693":["Water"], "PKMN694":["Electric","Normal"], "PKMN695":["Electric","Normal"], "PKMN696":["Rock","Dragon"], "PKMN697":["Rock","Dragon"], "PKMN698":["Rock","Ice"], "PKMN699":["Rock","Ice"], "PKMN700":["Fairy"], "PKMN701":["Fighting","Flying"], "PKMN702":["Electric","Fairy"], "PKMN703":["Rock","Fairy"], "PKMN704":["Dragon"], "PKMN705":["Dragon"], "PKMN706":["Dragon"], "PKMN707":["Steel","Fairy"], "PKMN708":["Ghost","Grass"], "PKMN709":["Ghost","Grass"], "PKMN710":["Ghost","Grass"], "PKMN711":["Ghost","Grass"], "PKMN712":["Ice"], "PKMN713":["Ice"], "PKMN714":["Flying","Dragon"], "PKMN715":["Flying","Dragon"], "PKMN716":["Fairy"], "PKMN717":["Dark","Flying"], "PKMN718":["Dragon","Ground"], "PKMN719":["Rock","Fairy"], "PKMN720":["Psychic","Ghost"], "PKMN721":["Fire","Water"], "PKMN722":["Grass","Flying"], "PKMN723":["Grass","Flying"], "PKMN724":["Grass","Ghost"], "PKMN725":["Fire"], "PKMN726":["Fire"], "PKMN727":["Fire","Dark"], "PKMN728":["Water"], "PKMN729":["Water"], "PKMN730":["Water","Fairy"], "PKMN731":["Normal","Flying"], "PKMN732":["Normal","Flying"], "PKMN733":["Normal","Flying"], "PKMN734":["Normal"], "PKMN735":["Normal"], "PKMN736":["Bug"], "PKMN737":["Bug","Electric"], "PKMN738":["Bug","Electric"], "PKMN739":["Fighting"], "PKMN740":["Fighting","Ice"], "PKMN741":["Fire","Flying"], "PKMN742":["Bug","Fairy"], "PKMN743":["Bug","Fairy"], "PKMN744":["Rock"], "PKMN745":["Rock"], "PKMN746":["Water"], "PKMN747":["Poison","Water"], "PKMN748":["Poison","Water"], "PKMN749":["Ground"], "PKMN750":["Ground"], "PKMN751":["Water","Bug"], "PKMN752":["Water","Bug"], "PKMN753":["Grass"], "PKMN754":["Grass"], "PKMN755":["Grass","Fairy"], "PKMN756":["Grass","Fairy"], "PKMN757":["Poison","Fire"], "PKMN758":["Poison","Fire"], "PKMN759":["Normal","Fighting"], "PKMN760":["Normal","Fighting"], "PKMN761":["Grass"], "PKMN762":["Grass"], "PKMN763":["Grass"], "PKMN764":["Fairy"], "PKMN765":["Normal","Psychic"], "PKMN766":["Fighting"], "PKMN767":["Bug","Water"], "PKMN768":["Bug","Water"], "PKMN769":["Ghost","Ground"], "PKMN770":["Ghost","Ground"], "PKMN771":["Water"], "PKMN772":["Normal"], "PKMN773":["Normal"], "PKMN774":["Rock","Flying"], "PKMN775":["Normal"], "PKMN776":["Fire","Dragon"], "PKMN777":["Electric","Steel"], "PKMN778":["Ghost","Fairy"], "PKMN779":["Water","Psychic"], "PKMN780":["Normal","Dragon"], "PKMN781":["Ghost","Grass"], "PKMN782":["Dragon"], "PKMN783":["Dragon","Fighting"], "PKMN784":["Dragon","Fighting"], "PKMN785":["Electric","Fairy"], "PKMN786":["Psychic","Fairy"], "PKMN787":["Grass","Fairy"], "PKMN788":["Water","Fairy"], "PKMN789":["Psychic"], "PKMN790":["Psychic"], "PKMN791":["Psychic","Steel"], "PKMN792":["Psychic","Ghost"], "PKMN793":["Rock","Poison"], "PKMN794":["Bug","Fighting"], "PKMN795":["Bug","Fighting"], "PKMN796":["Electric"], "PKMN797":["Steel","Flying"], "PKMN798":["Grass","Steel"], "PKMN799":["Dark","Dragon"], "PKMN800":["Psychic"], "PKMN801":["Steel","Fairy"], "PKMN802":["Fighting","Ghost"], "PKMN803":["Poison"], "PKMN804":["Poison","Dragon"], "PKMN805":["Rock","Steel"], "PKMN806":["Fire","Ghost"], "PKMN807":["Electric"], "PKMN808":["Steel"], "PKMN809":["Steel"], "PKMN810":["Grass"], "PKMN811":["Grass"], "PKMN812":["Grass"], "PKMN813":["Fire"], "PKMN814":["Fire"], "PKMN815":["Fire"], "PKMN816":["Water"], "PKMN817":["Water"], "PKMN818":["Water"], "PKMN819":["Normal"], "PKMN820":["Normal"], "PKMN821":["Flying"], "PKMN822":["Flying"], "PKMN823":["Flying","Steel"], "PKMN824":["Bug"], "PKMN825":["Bug","Psychic"], "PKMN826":["Bug","Psychic"], "PKMN827":["Dark"], "PKMN828":["Dark"], "PKMN829":["Grass"], "PKMN830":["Grass"], "PKMN831":["Normal"], "PKMN832":["Normal"], "PKMN833":["Water"], "PKMN834":["Water","Rock"], "PKMN835":["Electric"], "PKMN836":["Electric"], "PKMN837":["Rock"], "PKMN838":["Rock","Fire"], "PKMN839":["Rock","Fire"], "PKMN840":["Grass","Dragon"], "PKMN841":["Grass","Dragon"], "PKMN842":["Grass","Dragon"], "PKMN843":["Ground"], "PKMN844":["Ground"], "PKMN845":["Flying","Water"], "PKMN846":["Water"], "PKMN847":["Water"], "PKMN848":["Electric","Poison"], "PKMN849":["Electric","Poison"], "PKMN850":["Fire","Bug"], "PKMN851":["Fire","Bug"], "PKMN852":["Fighting"], "PKMN853":["Fighting"], "PKMN854":["Ghost"], "PKMN855":["Ghost"], "PKMN856":["Psychic"], "PKMN857":["Psychic"], "PKMN858":["Psychic","Fairy"], "PKMN859":["Dark","Fairy"], "PKMN860":["Dark","Fairy"], "PKMN861":["Dark","Fairy"], "PKMN862":["Dark","Normal"], "PKMN863":["Steel"], "PKMN864":["Ghost"], "PKMN865":["Fighting"], "PKMN866":["Ice","Psychic"], "PKMN867":["Ground","Ghost"], "PKMN868":["Fairy"], "PKMN869":["Fairy"], "PKMN870":["Fighting"], "PKMN871":["Electric"], "PKMN872":["Ice","Bug"], "PKMN873":["Ice","Bug"], "PKMN874":["Rock"], "PKMN875":["Ice"], "PKMN876":["Psychic","Normal"], "PKMN877":["Electric","Dark"], "PKMN878":["Steel"], "PKMN879":["Steel"], "PKMN880":["Electric","Dragon"], "PKMN881":["Electric","Ice"], "PKMN882":["Water","Dragon"], "PKMN883":["Water","Ice"], "PKMN884":["Steel","Dragon"], "PKMN885":["Dragon","Ghost"], "PKMN886":["Dragon","Ghost"], "PKMN887":["Dragon","Ghost"], "PKMN888":["Fairy"], "PKMN889":["Fighting"], "PKMN890":["Poison","Dragon"] };

const all_pokemon = [
	{"id":"001","name":"Bulbasaur","desc":"Bulbasaur can be seen napping in bright sunlight. There is a seed on its back. By soaking up the sun's rays, the seed grows progressively larger."},
	{"id":"002","name":"Ivysaur","desc":"There is a bud on this Pokemon's back. To support its weight, Ivysaur's legs and trunk grow thick and strong. If it starts spending more time lying in the sunlight, it's a sign that the bud will bloom into a large flower soon."},
	{"id":"003","name":"Venusaur","desc":"There is a large flower on Venusaur's back. The flower is said to take on vivid colors if it gets plenty of nutrition and sunlight. The flower's aroma soothes the emotions of people."},
	{"id":"004","name":"Charmander","desc":"The flame that burns at the tip of its tail is an indication of its emotions. The flame wavers when Charmander is enjoying itself. If the Pokemon becomes enraged, the flame burns fiercely."},
	{"id":"005","name":"Charmeleon","desc":"Charmeleon mercilessly destroys its foes using its sharp claws. If it encounters a strong foe, it turns aggressive. In this excited state, the flame at the tip of its tail flares with a bluish white color."},
	{"id":"006","name":"Charizard","desc":"Charizard flies around the sky in search of powerful opponents. It breathes fire of such great heat that it melts anything. However, it never turns its fiery breath on any opponent weaker than itself."},
	{"id":"007","name":"Squirtle","desc":"Squirtle's shell is not merely used for protection. The shell's rounded shape and the grooves on its surface help minimize resistance in water, enabling this Pokemon to swim at high speeds."},
	{"id":"008","name":"Wartortle","desc":"Its tail is large and covered with a rich, thick fur. The tail becomes increasingly deeper in color as Wartortle ages. The scratches on its shell are evidence of this Pokemon's toughness as a battler."},
	{"id":"009","name":"Blastoise","desc":"Blastoise has water spouts that protrude from its shell. The water spouts are very accurate. They can shoot bullets of water with enough accuracy to strike empty cans from a distance of over 160 feet."},
	{"id":"010","name":"Caterpie","desc":"Caterpie has a voracious appetite. It can devour leaves bigger than its body right before your eyes. From its antenna, this Pokemon releases a terrifically strong odor."},
	{"id":"011","name":"Metapod","desc":"The shell covering this Pokemon's body is as hard as an iron slab. Metapod does not move very much. It stays still because it is preparing its soft innards for evolution inside the hard shell."},
	{"id":"012","name":"Butterfree","desc":"Butterfree has a superior ability to search for delicious honey from flowers. It can even search out, extract, and carry honey from flowers that are blooming over six miles from its nest."},
	{"id":"013","name":"Weedle","desc":"Weedle has an extremely acute sense of smell. It is capable of distinguishing its favorite kinds of leaves from those it dislikes just by sniffing with its big red proboscis (nose)."},
	{"id":"014","name":"Kakuna","desc":"Kakuna remains virtually immobile as it clings to a tree. However, on the inside, it is extremely busy as it prepares for its coming evolution. This is evident from how hot the shell becomes to the touch."},
	{"id":"015","name":"Beedrill","desc":"Beedrill is extremely territorial. No one should ever approach its nest--this is for their own safety. If angered, they will attack in a furious swarm."},
	{"id":"016","name":"Pidgey","desc":"Pidgey has an extremely sharp sense of direction. It is capable of unerringly returning home to its nest, however far it may be removed from its familiar surroundings."},
	{"id":"017","name":"Pidgeotto","desc":"Pidgeotto claims a large area as its own territory. This Pokemon flies around, patrolling its living space. If its territory is violated, it shows no mercy in thoroughly punishing the foe with its sharp claws."},
	{"id":"018","name":"Pidgeot","desc":"This Pokemon has a dazzling plumage of beautifully glossy feathers. Many Trainers are captivated by the striking beauty of the feathers on its head, compelling them to choose Pidgeot as their Pokemon."},
	{"id":"019","name":"Rattata","desc":"Rattata is cautious in the extreme. Even while it is asleep, it constantly listens by moving its ears around. It is not picky about where it lives--it will make its nest anywhere."},
	{"id":"020","name":"Raticate","desc":"Raticate's sturdy fangs grow steadily. To keep them ground down, it gnaws on rocks and logs. It may even chew on the walls of houses."},
	{"id":"021","name":"Spearow","desc":"Spearow has a very loud cry that can be heard over half a mile away. If its high, keening cry is heard echoing all around, it is a sign that they are warning each other of danger."},
	{"id":"022","name":"Fearow","desc":"Fearow is recognized by its long neck and elongated beak. They are conveniently shaped for catching prey in soil or water. It deftly moves its long and skinny beak to pluck prey."},
	{"id":"023","name":"Ekans","desc":"Ekans curls itself up in a spiral while it rests. Assuming this position allows it to quickly respond to a threat from any direction with a glare from its upraised head."},
	{"id":"024","name":"Arbok","desc":"This Pokemon is terrifically strong in order to constrict things with its body. It can even flatten steel oil drums. Once Arbok wraps its body around its foe, escaping its crunching embrace is impossible."},
	{"id":"025","name":"Pikachu","desc":"This Pokemon has electricity-storing pouches on its cheeks. These appear to become electrically charged during the night while Pikachu sleeps. It occasionally discharges electricity when it is dozy after waking up."},
	{"id":"026","name":"Raichu","desc":"This Pokemon exudes a weak electrical charge from all over its body that makes it take on a slight glow in darkness. Raichu plants its tail in the ground to discharge electricity."},
	{"id":"027","name":"Sandshrew","desc":"Sandshrew has a very dry hide that is extremely tough. The Pokemon can roll into a ball that repels any attack. At night, it burrows into the desert sand to sleep."},
	{"id":"028","name":"Sandslash","desc":"Sandslash can roll up its body as if it were a ball covered with large spikes. In battle, this Pokemon will try to make the foe flinch by jabbing it with its spines. It then leaps at the stunned foe to tear wildly with its sharp claws."},
	//{"id":"029","name":"Nidoran","desc":"Nidoran-female has barbs that secrete a powerful poison. They are thought to have developed as protection for this small-bodied Pokemon. When enraged, it releases a horrible toxin from its horn."},
	{"id":"030","name":"Nidorina","desc":"When Nidorina are with their friends or family, they keep their barbs tucked away to prevent hurting each other. This Pokemon appears to become nervous if separated from the others."},
	{"id":"031","name":"Nidoqueen","desc":"Nidoqueen's body is encased in extremely hard scales. It is adept at sending foes flying with harsh tackles. This Pokemon is at its strongest when it is defending its young."},
	//{"id":"032","name":"Nidoran","desc":"Nidoran-male has developed muscles for moving its ears. Thanks to them, the ears can be freely moved in any direction. Even the slightest sound does not escape this Pokemon's notice."},
	{"id":"033","name":"Nidorino","desc":"Nidorino has a horn that is harder than a diamond. If it senses a hostile presence, all the barbs on its back bristle up at once, and it challenges the foe with all its might."},
	{"id":"034","name":"Nidoking","desc":"Nidoking's thick tail packs enormously destructive power. With one swing, it can topple a metal transmission tower. Once this Pokemon goes on a rampage, there is no stopping it."},
	{"id":"035","name":"Clefairy","desc":"On every night of a full moon, groups of this Pokemon come out to play. When dawn arrives, the tired Clefairy return to their quiet mountain retreats and go to sleep nestled up against each other."},
	{"id":"036","name":"Clefable","desc":"Clefable moves by skipping lightly as if it were flying using its wings. Its bouncy step lets it even walk on water. It is known to take strolls on lakes on quiet, moonlit nights."},
	{"id":"037","name":"Vulpix","desc":"Inside Vulpix's body burns a flame that never goes out. During the daytime, when the temperatures rise, this Pokemon releases flames from its mouth to prevent its body from growing too hot."},
	{"id":"038","name":"Ninetales","desc":"Legend has it that Ninetales came into being when nine wizards possessing sacred powers merged into one. This Pokemon is highly intelligent--it can understand human speech."},
	{"id":"039","name":"Jigglypuff","desc":"When this Pokemon sings, it never pauses to breathe. If it is in a battle against an opponent that does not easily fall asleep, Jigglypuff cannot breathe, endangering its life."},
	{"id":"040","name":"Wigglytuff","desc":"Wigglytuff's body is very flexible. By inhaling deeply, this Pokemon can inflate itself seemingly without end. Once inflated, Wigglytuff bounces along lightly like a balloon."},
	{"id":"041","name":"Zubat","desc":"Zubat avoids sunlight because exposure causes it to become unhealthy. During the daytime, it stays in caves or under the eaves of old houses, sleeping while hanging upside down."},
	{"id":"042","name":"Golbat","desc":"Golbat bites down on prey with its four fangs and drinks the victim's blood. It becomes active on inky dark moonless nights, flying around to attack people and Pokemon."},
	{"id":"043","name":"Oddish","desc":"Oddish searches for fertile, nutrient-rich soil, then plants itself. During the daytime, while it is planted, this Pokemon's feet are thought to change shape and become similar to the roots of trees."},
	{"id":"044","name":"Gloom","desc":"From its mouth Gloom drips honey that smells absolutely horrible. Apparently, it loves the horrid stench. It sniffs the noxious fumes and then drools even more of its honey."},
	{"id":"045","name":"Vileplume","desc":"Vileplume has the world's largest petals. They are used to attract prey that are then doused with toxic spores. Once the prey are immobilized, this Pokemon catches and devours them."},
	{"id":"046","name":"Paras","desc":"Paras has parasitic mushrooms growing on its back called tochukaso. They grow large by drawing nutrients from this Bug Pokemon host. They are highly valued as a medicine for extending life."},
	{"id":"047","name":"Parasect","desc":"Parasect is known to infest large trees en masse and drain nutrients from the lower trunk and roots. When an infested tree dies, they move onto another tree all at once."},
	{"id":"048","name":"Venonat","desc":"Venonat is said to have evolved with a coat of thin, stiff hair that covers its entire body for protection. It possesses large eyes that never fail to spot even minuscule prey."},
	{"id":"049","name":"Venomoth","desc":"Venomoth is nocturnal--it is a Pokemon that only becomes active at night. Its favorite prey are small insects that gather around streetlights, attracted by the light in the darkness."},
	{"id":"050","name":"Diglett","desc":"Diglett are raised in most farms. The reason is simple-- wherever this Pokemon burrows, the soil is left perfectly tilled for planting crops. This soil is made ideal for growing delicious vegetables."},
	{"id":"051","name":"Dugtrio","desc":"Dugtrio are actually triplets that emerged from one body. As a result, each triplet thinks exactly like the other two triplets. They work cooperatively to burrow endlessly."},
	{"id":"052","name":"Meowth","desc":"Meowth withdraws its sharp claws into its paws to slinkily sneak about without making any incriminating footsteps. For some reason, this Pokemon loves shiny coins that glitter with light."},
	{"id":"053","name":"Persian","desc":"Persian has six bold whiskers that give it a look of toughness. The whiskers sense air movements to determine what is in the Pokemon's surrounding vicinity. It becomes docile if grabbed by the whiskers."},
	{"id":"054","name":"Psyduck","desc":"If it uses its mysterious power, Psyduck can't remember having done so. It apparently can't form a memory of such an event because it goes into an altered state that is much like deep sleep."},
	{"id":"055","name":"Golduck","desc":"Golduck is the fastest swimmer among all Pokemon. It swims effortlessly, even in a rough, stormy sea. It sometimes rescues people from wrecked ships floundering in high seas."},
	{"id":"056","name":"Mankey","desc":"When Mankey starts shaking and its nasal breathing turns rough, it's a sure sign that it is becoming angry. However, because it goes into a towering rage almost instantly, it is impossible for anyone to flee its wrath."},
	{"id":"057","name":"Primeape","desc":"When Primeape becomes furious, its blood circulation is boosted. In turn, its muscles are made even stronger. However, it also becomes much less intelligent at the same time."},
	{"id":"058","name":"Growlithe","desc":"Growlithe has a superb sense of smell. Once it smells anything, this Pokemon won't forget the scent, no matter what. It uses its advanced olfactory sense to determine the emotions of other living things."},
	{"id":"059","name":"Arcanine","desc":"Arcanine is known for its high speed. It is said to be capable of running over 6,200 miles in a single day and night. The fire that blazes wildly within this Pokemon's body is its source of power."},
	{"id":"060","name":"Poliwag","desc":"Poliwag has a very thin skin. It is possible to see the Pokemon's spiral innards right through the skin. Despite its thinness, however, the skin is also very flexible. Even sharp fangs bounce right off it."},
	{"id":"061","name":"Poliwhirl","desc":"The surface of Poliwhirl's body is always wet and slick with a slimy fluid. Because of this slippery covering, it can easily slip and slide out of the clutches of any enemy in battle."},
	{"id":"062","name":"Poliwrath","desc":"Poliwrath's highly developed, brawny muscles never grow fatigued, however much it exercises. It is so tirelessly strong, this Pokemon can swim back and forth across the ocean without effort."},
	{"id":"063","name":"Abra","desc":"Abra needs to sleep for eighteen hours a day. If it doesn't, this Pokemon loses its ability to use telekinetic powers. If it is attacked, Abra escapes using Teleport while it is still sleeping."},
	{"id":"064","name":"Kadabra","desc":"Kadabra holds a silver spoon in its hand. The spoon is used to amplify the alpha waves in its brain. Without the spoon, the Pokemon is said to be limited to half the usual amount of its telekinetic powers."},
	{"id":"065","name":"Alakazam","desc":"Alakazam's brain continually grows, infinitely multiplying brain cells. This amazing brain gives this Pokemon an astoundingly high IQ of 5,000. It has a thorough memory of everything that has occurred in the world."},
	{"id":"066","name":"Machop","desc":"Machop exercises by hefting around a Graveler as if it were a barbell. There are some Machop that travel the world in a quest to master all kinds of martial arts."},
	{"id":"067","name":"Machoke","desc":"Machoke undertakes bodybuilding every day even as it helps people with tough, physically demanding labor. On its days off, this Pokemon heads to the fields and mountains to exercise and train."},
	{"id":"068","name":"Machamp","desc":"Machamp is known as the Pokemon that has mastered every kind of martial arts. If it grabs hold of the foe with its four arms, the battle is all but over. The hapless foe is thrown far over the horizon."},
	{"id":"069","name":"Bellsprout","desc":"Bellsprout's thin and flexible body lets it bend and sway to avoid any attack, however strong it may be. From its mouth, this Pokemon spits a corrosive fluid that melts even iron."},
	{"id":"070","name":"Weepinbell","desc":"Weepinbell has a large hook on its rear end. At night, the Pokemon hooks on to a tree branch and goes to sleep. If it moves around in its sleep, it may wake up to find itself on the ground."},
	{"id":"071","name":"Victreebel","desc":"Victreebel has a long vine that extends from its head. This vine is waved and flicked about as if it were an animal to attract prey. When an unsuspecting prey draws near, this Pokemon swallows it whole."},
	{"id":"072","name":"Tentacool","desc":"Tentacool absorbs sunlight and refracts it using water inside its body to convert it into beam energy. This Pokemon shoots beams from the small round organ above its eyes."},
	{"id":"073","name":"Tentacruel","desc":"Tentacruel has tentacles that can be freely elongated and shortened at will. It ensnares prey with its tentacles and weakens the prey by dosing it with a harsh toxin. It can catch up to 80 prey at the same time."},
	{"id":"074","name":"Geodude","desc":"When Geodude sleeps deeply, it buries itself halfway into the ground. It will not awaken even if hikers step on it unwittingly. In the morning, this Pokemon rolls downhill in search of food."},
	{"id":"075","name":"Graveler","desc":"Rocks are Graveler's favorite food. This Pokemon will climb a mountain from the base to the summit, crunchingly feasting on rocks all the while. Upon reaching the peak, it rolls back down to the bottom."},
	{"id":"076","name":"Golem","desc":"Golem is known for rolling down from mountains. To prevent them from rolling into the homes of people downhill, grooves have been dug into the sides of mountains to serve as guideways for diverting this Pokemon's course."},
	{"id":"077","name":"Ponyta","desc":"Ponyta is very weak at birth. It can barely stand up. This Pokemon becomes stronger by stumbling and falling to keep up with its parent."},
	{"id":"078","name":"Rapidash","desc":"Rapidash usually can be seen casually cantering in the fields and plains. However, when this Pokemon turns serious, its fiery manes flare and blaze as it gallops its way up to 150 mph."},
	{"id":"079","name":"Slowpoke","desc":"Slowpoke uses its tail to catch prey by dipping it in water at the side of a river. However, this Pokemon often forgets what it's doing and often spends entire days just loafing at water's edge."},
	{"id":"080","name":"Slowbro","desc":"Slowbro's tail has a Shellder firmly attached with a bite. As a result, the tail can't be used for fishing anymore. This causes Slowbro to grudgingly swim and catch prey instead."},
	{"id":"081","name":"Magnemite","desc":"Magnemite floats in the air by emitting electromagnetic waves from the units at its sides. These waves block gravity. This Pokemon becomes incapable of flight if its internal electrical supply is depleted."},
	{"id":"082","name":"Magneton","desc":"Magneton emits a powerful magnetic force that is fatal to electronics and precision instruments. Because of this, it is said that some towns warn people to keep this Pokemon inside a Poke Ball."},
	{"id":"083","name":"Farfetch'd","desc":"Farfetch'd is always seen with a stalk from a plant of some sort. Apparently, there are good stalks and bad stalks. This Pokemon has been known to fight with others over stalks."},
	{"id":"084","name":"Doduo","desc":"Doduo's two heads contain completely identical brains. A scientific study reported that on rare occasions, there will be examples of this Pokemon possessing different sets of brains."},
	{"id":"085","name":"Dodrio","desc":"Apparently, the heads aren't the only parts of the body that Dodrio has three of. It has three sets of hearts and lungs as well, so it is capable of running long distances without rest."},
	{"id":"086","name":"Seel","desc":"Seel hunts for prey in the frigid sea underneath sheets of ice. When it needs to breathe, it punches a hole through the ice with the sharply protruding section of its head."},
	{"id":"087","name":"Dewgong","desc":"Dewgong loves to snooze on bitterly cold ice. The sight of this Pokemon sleeping on a glacier was mistakenly thought to be a mermaid by a mariner long ago."},
	{"id":"088","name":"Grimer","desc":"Grimer emerged from the sludge that settled on a polluted seabed. This Pokemon loves anything filthy. It constantly leaks a horribly germ-infested fluid from all over its body."},
	{"id":"089","name":"Muk","desc":"This Pokemon's favorite food is anything that is repugnantly filthy. In dirty towns where people think nothing of throwing away litter on the streets, Muk are certain to gather."},
	{"id":"090","name":"Shellder","desc":"At night, this Pokemon uses its broad tongue to burrow a hole in the seafloor sand and then sleep in it. While it is sleeping, Shellder closes its shell, but leaves its tongue hanging out."},
	{"id":"091","name":"Cloyster","desc":"Cloyster is capable of swimming in the sea. It does so by swallowing water, then jetting it out toward the rear. This Pokemon shoots spikes from its shell using the same system."},
	{"id":"092","name":"Gastly","desc":"Gastly is largely composed of gaseous matter. When exposed to a strong wind, the gaseous body quickly dwindles away. Groups of this Pokemon cluster under the eaves of houses to escape the ravages of wind."},
	{"id":"093","name":"Haunter","desc":"Haunter is a dangerous Pokemon. If one beckons you while floating in darkness, you must never approach it. This Pokemon will try to lick you with its tongue and steal your life away."},
	{"id":"094","name":"Gengar","desc":"Sometimes, on a dark night, your shadow thrown by a streetlight will suddenly and startlingly overtake you. It is actually a Gengar running past you, pretending to be your shadow."},
	{"id":"095","name":"Onix","desc":"Onix has a magnet in its brain. It acts as a compass so that this Pokemon does not lose direction while it is tunneling. As it grows older, its body becomes increasingly rounder and smoother."},
	{"id":"096","name":"Drowzee","desc":"If your nose becomes itchy while you are sleeping, it's a sure sign that one of these Pokemon is standing above your pillow and trying to eat your dream through your nostrils."},
	{"id":"097","name":"Hypno","desc":"Hypno holds a pendulum in its hand. The arcing movement and glitter of the pendulum lull the foe into a deep state of hypnosis. While this Pokemon searches for prey, it polishes the pendulum."},
	{"id":"098","name":"Krabby","desc":"Krabby live on beaches, burrowed inside holes dug into the sand. On sandy beaches with little in the way of food, these Pokemon can be seen squabbling with each other over territory."},
	{"id":"099","name":"Kingler","desc":"Kingler has an enormous, oversized claw. It waves this huge claw in the air to communicate with others. However, because the claw is so heavy, the Pokemon quickly tires."},
	{"id":"100","name":"Voltorb","desc":"Voltorb is extremely sensitive--it explodes at the slightest of shocks. It is rumored that it was first created when a Poke Ball was exposed to a powerful pulse of energy."},
	{"id":"101","name":"Electrode","desc":"One of Electrode's characteristics is its attraction to electricity. It is a problematical Pokemon that congregates mostly at electrical power plants to feed on electricity that has just been generated."},
	{"id":"102","name":"Exeggcute","desc":"This Pokemon consists of six eggs that form a closely knit cluster. The six eggs attract each other and spin around. When cracks increasingly appear on the eggs, Exeggcute is close to evolution."},
	{"id":"103","name":"Exeggutor","desc":"This pokemon originally came from the tropics. Its heads steadily grow larger from exposure to strong sunlight. It is said that when the heads fall off, they group together to form Exeggcute."},
	{"id":"104","name":"Cubone","desc":"This pokemon pines for the mother it will never see again. Seeing a likeness of its mother in the full moon, it cries. The stains on the skull the Pokemon wears are made by the tears it sheds."},
	{"id":"105","name":"Marowak","desc":"This pokemon is the evolved form of a Cubone that has overcome its sadness at the loss of its mother and grown tough. This Pokemon's tempered and hardened spirit is not easily broken."},
	{"id":"106","name":"Hitmonlee","desc":"This pokemon's legs freely contract and stretch. Using these springlike legs, it bowls over foes with devastating kicks. After battle, it rubs down its legs and loosens the muscles to overcome fatigue."},
	{"id":"107","name":"Hitmonchan","desc":"This pokemon is said to possess the spirit of a boxer who had been working toward a world championship. This Pokemon has an indomitable spirit and will never give up in the face of adversity."},
	{"id":"108","name":"Lickitung","desc":"Whenever This pokemon comes across something new, it will unfailingly give it a lick. It does so because it memorizes things by texture and by taste. It is somewhat put off by sour things."},
	{"id":"109","name":"Koffing","desc":"This pokemon embodies toxic substances. It mixes the toxins with raw garbage to set off a chemical reaction that results in a terribly powerful poison gas. The higher the temperature, the more gas is concocted by this Pokemon."},
	{"id":"110","name":"Weezing","desc":"This pokemon alternately shrinks and inflates its twin bodies to mix together toxic gases inside. The more the gases are mixed, the more powerful the toxins become. The Pokemon also becomes more putrid."},
	{"id":"111","name":"Rhyhorn","desc":"This pokemon's brain is very small. It is so dense, while on a run it forgets why it started running in the first place. It apparently remembers sometimes if it demolishes something."},
	{"id":"112","name":"Rhydon","desc":"This pokemon has a horn that serves as a drill. It is used for destroying rocks and boulders. This Pokemon occasionally rams into streams of magma, but the armor-like hide prevents it from feeling the heat."},
	{"id":"113","name":"Chansey","desc":"This pokemon lays nutritionally excellent eggs on an everyday basis. The eggs are so delicious, they are easily and eagerly devoured by even those people who have lost their appetite."},
	{"id":"114","name":"Tangela","desc":"This pokemon's vines snap off easily if they are grabbed. This happens without pain, allowing it to make a quick getaway. The lost vines are replaced by newly grown vines the very next day."},
	{"id":"115","name":"Kangaskhan","desc":"If you come across a young Kangaskhan playing by itself, you must never disturb it or attempt to catch it. The baby Pokemon's parent is sure to be in the area, and it will become violently enraged at you."},
	{"id":"116","name":"Horsea","desc":"If Horsea senses danger, it will reflexively spray a dense black ink from its mouth and try to escape. This Pokemon swims by cleverly flapping the fin on its back."},
	{"id":"117","name":"Seadra","desc":"Seadra generates whirlpools by spinning its body. The whirlpools are strong enough to swallow even fishing boats. This Pokemon weakens prey with these currents, then swallows it whole."},
	{"id":"118","name":"Goldeen","desc":"Goldeen loves swimming wild and free in rivers and ponds. If one of these Pokemon is placed in an aquarium, it will shatter even the thickest glass with one ram of its horn and make its escape."},
	{"id":"119","name":"Seaking","desc":"Seaking is very protective of its eggs. The male and female will take turns patrolling around their nest and eggs. The guarding of eggs by these Pokemon goes on for over a month."},
	{"id":"120","name":"Staryu","desc":"Staryu apparently communicates with the stars in the night sky by flashing the red core at the center of its body. If parts of its body are torn, this Pokemon simply regenerates the missing pieces and limbs."},
	{"id":"121","name":"Starmie","desc":"Starmie swims through water by spinning its star-shaped body as if it were a propeller on a ship. The core at the center of this Pokemon's body glows in seven colors."},
	{"id":"122","name":"Mr. Mime","desc":"Mr. Mime is a master of pantomime. Its gestures and motions convince watchers that something unseeable actually exists. Once the watchers are convinced, the unseeable thing exists as if it were real."},
	{"id":"123","name":"Scyther","desc":"Scyther is blindingly fast. Its blazing speed enhances the effectiveness of the twin scythes on its forearms. This Pokemon's scythes are so effective, they can slice through thick logs in one wicked stroke."},
	{"id":"124","name":"Jynx","desc":"Jynx walks rhythmically, swaying and shaking its hips as if it were dancing. Its motions are so bouncingly alluring, people seeing it are compelled to shake their hips without giving any thought to what they are doing."},
	{"id":"125","name":"Electabuzz","desc":"When a storm arrives, gangs of this Pokemon compete with each other to scale heights that are likely to be stricken by lightning bolts. Some towns use Electabuzz in place of lightning rods."},
	{"id":"126","name":"Magmar","desc":"In battle, Magmar blows out intensely hot flames from all over its body to intimidate its opponent. This Pokemon's fiery bursts create heat waves that ignite grass and trees in its surroundings."},
	{"id":"127","name":"Pinsir","desc":"Pinsir has a pair of massive horns. Protruding from the surface of these horns are thorns. These thorns are driven deeply into the foe's body when the pincer closes, making it tough for the foe to escape."},
	{"id":"128","name":"Tauros","desc":"This Pokemon is not satisfied unless it is rampaging at all times. If there is no opponent for Tauros to battle, it will charge at thick trees and knock them down to calm itself."},
	{"id":"129","name":"Magikarp","desc":"Magikarp is virtually useless in battle as it can only splash around. As a result, it is considered to be weak. However, it is actually a very hardy Pokemon that can survive in any body of water no matter how polluted it is."},
	{"id":"130","name":"Gyarados","desc":"Once Gyarados goes on a rampage, its ferociously violent blood doesn't calm until it has burned everything down. There are records of this Pokemon's rampages lasting a whole month."},
	{"id":"131","name":"Lapras","desc":"People have driven Lapras almost to the point of extinction. In the evenings, this Pokemon is said to sing plaintively as it seeks what few others of its kind still remain."},
	{"id":"132","name":"Ditto","desc":"Ditto rearranges its cell structure to transform itself into other shapes. However, if it tries to transform itself into something by relying on its memory, this Pokemon manages to get details wrong."},
	{"id":"133","name":"Eevee","desc":"Eevee has an unstable genetic makeup that suddenly mutates due to the environment in which it lives. Radiation from various stones causes this Pokemon to evolve."},
	{"id":"134","name":"Vaporeon","desc":"Vaporeon underwent a spontaneous mutation and grew fins and gills that allow it to live underwater. This Pokemon has the ability to freely control water."},
	{"id":"135","name":"Jolteon","desc":"Jolteon's cells generate a low level of electricity. This power is amplified by the static electricity of its fur, enabling the Pokemon to drop thunderbolts. The bristling fur is made of electrically charged needles."},
	{"id":"136","name":"Flareon","desc":"Flareon's fluffy fur has a functional purpose--it releases heat into the air so that its body does not get excessively hot. This Pokemon's body temperature can rise to a maximum of 1,650 degrees Fahrenheit."},
	{"id":"137","name":"Porygon","desc":"Porygon is capable of reverting itself entirely back to program data and entering cyberspace. This Pokemon is copy protected so it cannot be duplicated by copying."},
	{"id":"138","name":"Omanyte","desc":"Omanyte is one of the ancient and long-since-extinct Pokemon that have been regenerated from fossils by people. If attacked by an enemy, it withdraws itself inside its hard shell."},
	{"id":"139","name":"Omastar","desc":"Omastar uses its tentacles to capture its prey. It is believed to have become extinct because its shell grew too large and heavy, causing its movements to become too slow and ponderous."},
	{"id":"140","name":"Kabuto","desc":"Kabuto is a Pokemon that has been regenerated from a fossil. However, in extremely rare cases, living examples have been discovered. The Pokemon has not changed at all for 300 million years."},
	{"id":"141","name":"Kabutops","desc":"Kabutops swam underwater to hunt for its prey in ancient times. The Pokemon was apparently evolving from being a water dweller to living on land as evident from the beginnings of change in its gills and legs."},
	{"id":"142","name":"Aerodactyl","desc":"Aerodactyl is a Pokemon from the age of dinosaurs. It was regenerated from genetic material extracted from amber. It is imagined to have been the king of the skies in ancient times."},
	{"id":"143","name":"Snorlax","desc":"Snorlax's typical day consists of nothing more than eating and sleeping. It is such a docile Pokemon that there are children who use its expansive belly as a place to play."},
	{"id":"144","name":"Articuno","desc":"Articuno is a legendary bird Pokemon that can control ice. The flapping of its wings chills the air. As a result, it is said that when this Pokemon flies, snow will fall."},
	{"id":"145","name":"Zapdos","desc":"Zapdos is a legendary bird Pokemon that has the ability to control electricity. It usually lives in thunderclouds. The Pokemon gains power if it is stricken by lightning bolts."},
	{"id":"146","name":"Moltres","desc":"Moltres is a legendary bird Pokemon that has the ability to control fire. If this Pokemon is injured, it is said to dip its body in the molten magma of a volcano to burn and heal itself."},
	{"id":"147","name":"Dratini","desc":"Dratini continually molts and sloughs off its old skin. It does so because the life energy within its body steadily builds to reach uncontrollable levels."},
	{"id":"148","name":"Dragonair","desc":"Dragonair stores an enormous amount of energy inside its body. It is said to alter weather conditions in its vicinity by discharging energy from the crystals on its neck and tail."},
	{"id":"149","name":"Dragonite","desc":"Dragonite is capable of circling the globe in just 16 hours. It is a kindhearted Pokemon that leads lost and foundering ships in a storm to the safety of land."},
	{"id":"150","name":"Mewtwo","desc":"Mewtwo is a Pokemon that was created by genetic manipulation. However, even though the scientific power of humans created this Pokemon's body, they failed to endow Mewtwo with a compassionate heart."},
	{"id":"151","name":"Mew","desc":"Mew is said to possess the genetic composition of all Pokemon. It is capable of making itself invisible at will, so it entirely avoids notice even if it approaches people."},
	{"id":"152","name":"Chikorita","desc":"In battle, Chikorita waves its leaf around to keep the foe at bay. However, a sweet fragrance also wafts from the leaf, becalming the battling Pokemon and creating a cozy, friendly atmosphere all around."},
	{"id":"153","name":"Bayleef","desc":"Bayleef's neck is ringed by curled-up leaves. Inside each tubular leaf is a small shoot of a tree. The fragrance of this shoot makes people peppy."},
	{"id":"154","name":"Meganium","desc":"The fragrance of Meganium's flower soothes and calms emotions. In battle, this Pokemon gives off more of its becalming scent to blunt the foe's fighting spirit."},
	{"id":"155","name":"Cyndaquil","desc":"Cyndaquil protects itself by flaring up the flames on its back. The flames are vigorous if the Pokemon is angry. However, if it is tired, the flames splutter fitfully with incomplete combustion."},
	{"id":"156","name":"Quilava","desc":"Quilava keeps its foes at bay with the intensity of its flames and gusts of superheated air. This Pokemon applies its outstanding nimbleness to dodge attacks even while scorching the foe with flames."},
	{"id":"157","name":"Typhlosion","desc":"Typhlosion obscures itself behind a shimmering heat haze that it creates using its intensely hot flames. This Pokemon creates blazing explosive blasts that burn everything to cinders."},
	{"id":"158","name":"Totodile","desc":"Despite the smallness of its body, Totodile's jaws are very powerful. While the Pokemon may think it is just playfully nipping, its bite has enough power to cause serious injury."},
	{"id":"159","name":"Croconaw","desc":"Once Croconaw has clamped its jaws on its foe, it will absolutely not let go. Because the tips of its fangs are forked back like barbed fishhooks, they become impossible to remove when they have sunk in."},
	{"id":"160","name":"Feraligatr","desc":"Feraligatr intimidates its foes by opening its huge mouth. In battle, it will kick the ground hard with its thick and powerful hind legs to charge at the foe at an incredible speed."},
	{"id":"161","name":"Sentret","desc":"When Sentret sleeps, it does so while another stands guard. The sentry wakes the others at the first sign of danger. When this Pokemon becomes separated from its pack, it becomes incapable of sleep due to fear."},
	{"id":"162","name":"Furret","desc":"Furret has a very slim build. When under attack, it can slickly squirm through narrow spaces and get away. In spite of its short limbs, this Pokemon is very nimble and fleet."},
	{"id":"163","name":"Hoothoot","desc":"Hoothoot has an internal organ that senses and tracks the earth's rotation. Using this special organ, this Pokemon begins hooting at precisely the same time every day."},
	{"id":"164","name":"Noctowl","desc":"Noctowl never fails at catching prey in darkness. This Pokemon owes its success to its superior vision that allows it to see in minimal light, and to its soft, supple wings that make no sound in flight."},
	{"id":"165","name":"Ledyba","desc":"Ledyba secretes an aromatic fluid from where its legs join its body. This fluid is used for communicating with others. This Pokemon conveys its feelings to others by altering the fluid's scent."},
	{"id":"166","name":"Ledian","desc":"It is said that in lands with clean air, where the stars fill the sky, there live Ledian in countless numbers. There is a good reason for this--the Pokemon uses the light of the stars as its energy."},
	{"id":"167","name":"Spinarak","desc":"The web spun by Spinarak can be considered its second nervous system. It is said that this Pokemon can determine what kind of prey is touching its web just by the tiny vibrations it feels through the web's strands."},
	{"id":"168","name":"Ariados","desc":"Ariados's feet are tipped with tiny hooked claws that enable it to scuttle on ceilings and vertical walls. This Pokemon constricts the foe with thin and strong silk webbing."},
	{"id":"169","name":"Crobat","desc":"Crobat sneaks up on its intended prey using wings that barely make a sound. This Pokemon rests by hanging on a tree branch with its rear legs that serve as wings."},
	{"id":"170","name":"Chinchou","desc":"Chinchou's two antennas are filled with cells that generate strong electricity. This Pokemon's cells create so much electrical power, it even makes itself tingle slightly."},
	{"id":"171","name":"Lanturn","desc":"Lanturn is known to emit light. If you peer down into the dark sea from a ship at night, you can sometimes see this Pokemon's light rising from the depths where it swims. It gives the sea an appearance of a starlit night."},
	{"id":"172","name":"Pichu","desc":"When Pichu plays with others, it may short out electricity with another Pichu, creating a shower of sparks. In that event, this Pokemon will begin crying, startled by the flash of sparks."},
	{"id":"173","name":"Cleffa","desc":"On nights with many shooting stars, Cleffa can be seen dancing in a ring. They dance through the night and stop only at the break of day, when these Pokemon quench their thirst with the morning dew."},
	{"id":"174","name":"Igglybuff","desc":"Igglybuff has a soft and plushy body that feels very much like a marshmallow. From this body wafts a gently sweet fragrance that soothes and calms the emotions of its foes."},
	{"id":"175","name":"Togepi","desc":"As its energy, Togepi uses the positive emotions of compassion and pleasure exuded by people and Pokemon. This Pokemon stores up feelings of happiness inside its shell, then shares them with others."},
	{"id":"176","name":"Togetic","desc":"Togetic is said to be a Pokemon that brings good fortune. When the Pokemon spots someone who is pure of heart, it is said to appear and share its happiness with that person."},
	{"id":"177","name":"Natu","desc":"Natu has a highly developed jumping ability. The Pokemon flaps and leaps onto tree branches that are taller than grown-up people to pick at the tree's new shoots."},
	{"id":"178","name":"Xatu","desc":"Xatu is known to stand motionless while staring at the sun all day long. Some people revere it as a mystical Pokemon out of their belief that Xatu is in possession of the power to see into the future."},
	{"id":"179","name":"Mareep","desc":"Mareep's fluffy coat of wool rubs together and builds a static charge. The more static electricity is charged, the more brightly the lightbulb at the tip of its tail glows."},
	{"id":"180","name":"Flaaffy","desc":"Flaaffy's wool quality changes so that it can generate a high amount of static electricity with a small amount of wool. The bare and slick parts of its hide are shielded against electricity."},
	{"id":"181","name":"Ampharos","desc":"Ampharos gives off so much light that it can be seen even from space. People in the old days used the light of this Pokemon to send signals back and forth with others far away."},
	{"id":"182","name":"Bellossom","desc":"A Bellossom grows flowers more beautifully if it has evolved from a smelly Gloom--the more stinky the better. At night, this Pokemon closes its petals and goes to sleep."},
	{"id":"183","name":"Marill","desc":"When fishing for food at the edge of a fast-running stream, Marill wraps its tail around the trunk of a tree. This Pokemon's tail is flexible and configured to stretch."},
	{"id":"184","name":"Azumarill","desc":"Azumarill can make balloons out of air. It makes these air balloons if it spots a drowning Pokemon. The air balloons enable the Pokemon in trouble to breathe."},
	{"id":"185","name":"Sudowoodo","desc":"Sudowoodo camouflages itself as a tree to avoid being attacked by enemies. However, because its hands remain green throughout the year, the Pokemon is easily identified as a fake during the winter."},
	{"id":"186","name":"Politoed","desc":"The curled hair on Politoed's head is proof of its status as a king. It is said that the longer and more curled the hair, the more respect this Pokemon earns from its peers."},
	{"id":"187","name":"Hoppip","desc":"This Pokemon drifts and floats with the wind. If it senses the approach of strong winds, Hoppip links its leaves with other Hoppip to prepare against being blown away."},
	{"id":"188","name":"Skiploom","desc":"Skiploom's flower blossoms when the temperature rises above 64 degrees Fahrenheit. How much the flower opens depends on the temperature. For that reason, this Pokemon is sometimes used as a thermometer."},
	{"id":"189","name":"Jumpluff","desc":"Jumpluff rides warm southern winds to cross the sea and fly to foreign lands. The Pokemon descends to the ground when it encounters cold air while it is floating."},
	{"id":"190","name":"Aipom","desc":"Aipom's tail ends in a hand-like appendage that can be cleverly manipulated. However, because the Pokemon uses its tail so much, its real hands have become rather clumsy."},
	{"id":"191","name":"Sunkern","desc":"Sunkern tries to move as little as it possibly can. It does so because it tries to conserve all the nutrients it has stored in its body for its evolution. It will not eat a thing, subsisting only on morning dew."},
	{"id":"192","name":"Sunflora","desc":"Sunflora converts solar energy into nutrition. It moves around actively in the daytime when it is warm. It stops moving as soon as the sun goes down for the night."},
	{"id":"193","name":"Yanma","desc":"Yanma is capable of seeing 360 degrees without having to move its eyes. It is a great flier that is adept at making sudden stops and turning midair. This Pokemon uses its flying ability to quickly chase down targeted prey."},
	{"id":"194","name":"Wooper","desc":"Wooper usually lives in water. However, it occasionally comes out onto land in search of food. On land, it coats its body with a gooey, toxic film."},
	{"id":"195","name":"Quagsire","desc":"Quagsire hunts for food by leaving its mouth wide open in water and waiting for its prey to blunder in unaware. Because the Pokemon does not move, it does not get very hungry."},
	{"id":"196","name":"Espeon","desc":"Espeon is extremely loyal to any Trainer it considers to be worthy. It is said that this Pokemon developed its precognitive powers to protect its Trainer from harm."},
	{"id":"197","name":"Umbreon","desc":"Umbreon evolved as a result of exposure to the moon's waves. It hides silently in darkness and waits for its foes to make a move. The rings on its body glow when it leaps to attack."},
	{"id":"198","name":"Murkrow","desc":"Murkrow was feared and loathed as the alleged bearer of ill fortune. This Pokemon shows strong interest in anything that sparkles or glitters. It will even try to steal rings from women."},
	{"id":"199","name":"Slowking","desc":"Slowking undertakes research every day in an effort to solve the mysteries of the world. However, this Pokemon apparently forgets everything it has learned if the Shellder on its head comes off."},
	{"id":"200","name":"Misdreavus","desc":"Misdreavus frightens people with a creepy, sobbing cry. The Pokemon apparently uses its red spheres to absorb the fearful feelings of foes and turn them into nutrition."},
	{"id":"201","name":"Unown","desc":"This Pokemon is shaped like ancient writing. It is a mystery as to which came first, the ancient writings or the various Unown. Research into this topic is ongoing but nothing is known."},
	{"id":"202","name":"Wobbuffet","desc":"Wobbuffet does nothing but endure attacks--it won't attack on its own. However, it won't endure an attack on its tail. When that happens, the Pokemon will try to take the foe with it using Destiny Bond."},
	{"id":"203","name":"Girafarig","desc":"Girafarig's rear head contains a tiny brain that is too small for thinking. However, the rear head doesn't need to sleep, so it can keep watch over its surroundings 24 hours a day."},
	{"id":"204","name":"Pineco","desc":"Pineco hangs from a tree branch and patiently waits for prey to come along. If the Pokemon is disturbed while eating by someone shaking its tree, it drops down to the ground and explodes with no warning."},
	{"id":"205","name":"Forretress","desc":"Forretress conceals itself inside its hardened steel shell. The shell is opened when the Pokemon is catching prey, but it does so at such a quick pace that the shell's inside cannot be seen."},
	{"id":"206","name":"Dunsparce","desc":"Dunsparce has a drill for its tail. It uses this tail to burrow into the ground backward. This Pokemon is known to make its nest in complex shapes deep under the ground."},
	{"id":"207","name":"Gligar","desc":"Gligar glides through the air without a sound as if it were sliding. This Pokemon hangs on to the face of its foe using its clawed hind legs and the large pincers on its forelegs, then injects the prey with its poison barb."},
	{"id":"208","name":"Steelix","desc":"Steelix lives even further underground than Onix. This Pokemon is known to dig toward the earth's core. There are records of this Pokemon reaching a depth of over six-tenths of a mile underground."},
	{"id":"209","name":"Snubbull","desc":"By baring its fangs and making a scary face, Snubbull sends smaller Pokemon scurrying away in terror. However, this Pokemon seems a little sad at making its foes flee."},
	{"id":"210","name":"Granbull","desc":"Granbull has a particularly well-developed lower jaw. The enormous fangs are heavy, causing the Pokemon to tip its head back for balance. Unless it is startled, it will not try to bite indiscriminately."},
	{"id":"211","name":"Qwilfish","desc":"Qwilfish sucks in water, inflating itself. This Pokemon uses the pressure of the water it swallowed to shoot toxic quills all at once from all over its body. It finds swimming somewhat challenging."},
	{"id":"212","name":"Scizor","desc":"Scizor has a body with the hardness of steel. It is not easily fazed by ordinary sorts of attacks. This Pokemon flaps its wings to regulate its body temperature."},
	{"id":"213","name":"Shuckle","desc":"Shuckle quietly hides itself under rocks, keeping its body concealed inside its hard shell while eating berries it has stored away. The berries mix with its body fluids to become a juice."},
	{"id":"214","name":"Heracross","desc":"Heracross has sharp claws on its feet. These are planted firmly into the ground or the bark of a tree, giving the Pokemon a secure and solid footing to forcefully fling away foes with its proud horn."},
	{"id":"215","name":"Sneasel","desc":"Sneasel scales trees by punching its hooked claws into the bark. This Pokemon seeks out unguarded nests and steals eggs for food while the parents are away."},
	{"id":"216","name":"Teddiursa","desc":"This Pokemon likes to lick its palms that are sweetened by being soaked in honey. Teddiursa concocts its own honey by blending fruits and pollen collected by Beedrill."},
	{"id":"217","name":"Ursaring","desc":"In the forests inhabited by Ursaring, it is said that there are many streams and towering trees where they gather food. This Pokemon walks through its forest gathering food every day."},
	{"id":"218","name":"Slugma","desc":"Slugma does not have any blood in its body. Instead, intensely hot magma circulates throughout this Pokemon's body, carrying essential nutrients and oxygen to its organs."},
	{"id":"219","name":"Magcargo","desc":"Magcargo's body temperature is approximately 18,000 degrees Fahrenheit. Water is vaporized on contact. If this Pokemon is caught in the rain, the raindrops instantly turn into steam, cloaking the area in a thick fog."},
	{"id":"220","name":"Swinub","desc":"Swinub roots for food by rubbing its snout against the ground. Its favorite food is a mushroom that grows under the cover of dead grass. This Pokemon occasionally roots out hot springs."},
	{"id":"221","name":"Piloswine","desc":"Piloswine is covered by a thick coat of long hair that enables it to endure the freezing cold. This Pokemon uses its tusks to dig up food that has been buried under ice."},
	{"id":"222","name":"Corsola","desc":"Clusters of Corsola congregate in warm seas where they serve as ideal hiding places for smaller Pokemon. When the water temperature falls, this Pokemon migrates to the southern seas."},
	{"id":"223","name":"Remoraid","desc":"Remoraid sucks in water, then expels it at high velocity using its abdominal muscles to shoot down flying prey. When evolution draws near, this Pokemon travels downstream from rivers."},
	{"id":"224","name":"Octillery","desc":"Octillery grabs onto its foe using its tentacles. This Pokemon tries to immobilize it before delivering the finishing blow. If the foe turns out to be too strong, Octillery spews ink to escape."},
	{"id":"225","name":"Delibird","desc":"Delibird carries its food bundled up in its tail. There once was a famous explorer who managed to reach the peak of the world's highest mountain, thanks to one of these Pokemon sharing its food."},
	{"id":"226","name":"Mantine","desc":"On sunny days, schools of Mantine can be seen elegantly leaping over the sea's waves. This Pokemon is not bothered by the Remoraid that hitches rides."},
	{"id":"227","name":"Skarmory","desc":"Skarmory's steel wings become tattered and bashed in from repeated battles. Once a year, the battered wings grow back completely, restoring the cutting edges to their pristine state."},
	{"id":"228","name":"Houndour","desc":"Houndour hunt as a coordinated pack. They communicate with each other using a variety of cries to corner their prey. This Pokemon's remarkable teamwork is unparalleled."},
	{"id":"229","name":"Houndoom","desc":"In a Houndoom pack, the one with its horns raked sharply toward the back serves a leadership role. These Pokemon choose their leader by fighting among themselves."},
	{"id":"230","name":"Kingdra","desc":"Kingdra sleeps on the seafloor where it is otherwise devoid of life. When a storm arrives, the Pokemon is said to awaken and wander about in search of prey."},
	{"id":"231","name":"Phanpy","desc":"Phanpy uses its long nose to shower itself. When others gather around, they thoroughly douse each other with water. These Pokemon can be seen drying their soaking-wet bodies at the edge of water."},
	{"id":"232","name":"Donphan","desc":"If Donphan were to tackle with its hard body, even a house could be destroyed. Using its massive strength, the Pokemon helps clear rock and mud slides that block mountain trails."},
	{"id":"233","name":"Porygon2","desc":"Porygon2 was created by humans using the power of science. The man-made Pokemon has been endowed with artificial intelligence that enables it to learn new gestures and emotions on its own."},
	{"id":"234","name":"Stantler","desc":"Stantler's magnificent antlers were traded at high prices as works of art. As a result, this Pokemon was hunted close to extinction by those who were after the priceless antlers."},
	{"id":"235","name":"Smeargle","desc":"Smeargle marks the boundaries of its territory using a body fluid that leaks out from the tip of its tail. Over 5,000 different marks left by this Pokemon have been found."},
	{"id":"236","name":"Tyrogue","desc":"Tyrogue becomes stressed out if it does not get to train every day. When raising this Pokemon, the Trainer must establish and uphold various training methods."},
	{"id":"237","name":"Hitmontop","desc":"Hitmontop spins on its head at high speed, all the while delivering kicks. This technique is a remarkable mix of both offense and defense at the same time. The Pokemon travels faster spinning than it does walking."},
	{"id":"238","name":"Smoochum","desc":"Smoochum actively runs about, but also falls quite often. Whenever the chance arrives, it will look for its reflection to make sure its face hasn't become dirty."},
	{"id":"239","name":"Elekid","desc":"Elekid stores electricity in its body. If it touches metal and accidentally discharges all its built-up electricity, this Pokemon begins swinging its arms in circles to recharge itself."},
	{"id":"240","name":"Magby","desc":"Magby's state of health is determined by observing the fire it breathes. If the Pokemon is spouting yellow flames from its mouth, it is in good health. When it is fatigued, black smoke will be mixed in with the flames."},
	{"id":"241","name":"Miltank","desc":"Miltank gives over five gallons of milk on a daily basis. Its sweet milk is enjoyed by children and grown-ups alike. People who can't drink milk turn it into yogurt and eat it instead."},
	{"id":"242","name":"Blissey","desc":"Blissey senses sadness with its fluffy coat of fur. If it does so, this Pokemon will rush over to a sad person, no matter how far away, to share a Lucky Egg that brings a smile to any face."},
	{"id":"243","name":"Raikou","desc":"Raikou embodies the speed of lightning. The roars of this Pokemon send shock waves shuddering through the air and shake the ground as if lightning bolts had come crashing down."},
	{"id":"244","name":"Entei","desc":"Entei embodies the passion of magma. This Pokemon is thought to have been born in the eruption of a volcano. It sends up massive bursts of fire that utterly consume all that they touch."},
	{"id":"245","name":"Suicune","desc":"Suicune embodies the compassion of a pure spring of water. It runs across the land with gracefulness. This Pokemon has the power to purify dirty water."},
	{"id":"246","name":"Larvitar","desc":"Larvitar is born deep under the ground. To come up to the surface, this Pokemon must eat its way through the soil above. Until it does so, Larvitar cannot see its parents."},
	{"id":"247","name":"Pupitar","desc":"Pupitar creates a gas inside its body that it compresses and forcefully ejects to propel itself like a jet. The body is very durable--it avoids damage even if it hits solid steel."},
	{"id":"248","name":"Tyranitar","desc":"Tyranitar is so overwhelmingly powerful, it can bring down a whole mountain to make its nest. This Pokemon wanders about in mountains seeking new opponents to fight."},
	{"id":"249","name":"Lugia","desc":"Lugia's wings pack devastating power--a light fluttering of its wings can blow apart regular houses. As a result, this Pokemon chooses to live out of sight deep under the sea."},
	{"id":"250","name":"Ho-Oh","desc":"Ho-Oh's feathers glow in seven colors depending on the angle at which they are struck by light. These feathers are said to bring happiness to the bearers. This Pokemon is said to live at the foot of a rainbow."},
	{"id":"251","name":"Celebi","desc":"This Pokemon came from the future by crossing over time. It is thought that so long as Celebi appears, a bright and shining future awaits us."},
	{"id":"252","name":"Treecko","desc":"Treecko is cool, calm, and collected--it never panics under any situation. If a bigger foe were to glare at this Pokemon, it would glare right back without conceding an inch of ground."},
	{"id":"253","name":"Grovyle","desc":"This Pokemon adeptly flies from branch to branch in trees. In a forest, no Pokemon can ever hope to catch a fleeing Grovyle however fast they may be."},
	{"id":"254","name":"Sceptile","desc":"Sceptile has seeds growing on its back. They are said to be bursting with nutrients that revitalize trees. This Pokemon raises the trees in a forest with loving care."},
	{"id":"255","name":"Torchic","desc":"Torchic has a place inside its body where it keeps its flame. Give it a hug--it will be glowing with warmth. This Pokemon is covered all over by a fluffy coat of down."},
	{"id":"256","name":"Combusken","desc":"Combusken battles with the intensely hot flames it spews from its beak and with outstandingly destructive kicks. This Pokemon's cry is very loud and distracting."},
	{"id":"257","name":"Blaziken","desc":"Blaziken has incredibly strong legs--it can easily clear a 30-story building in one leap. This Pokemon's blazing punches leave its foes scorched and blackened."},
	{"id":"258","name":"Mudkip","desc":"In water, Mudkip breathes using the gills on its cheeks. If it is faced with a tight situation in battle, this Pokemon will unleash its amazing power--it can crush rocks bigger than itself."},
	{"id":"259","name":"Marshtomp","desc":"Marshtomp is much faster at traveling through mud than it is at swimming. This Pokemon's hindquarters exhibit obvious development, giving it the ability to walk on just its hind legs."},
	{"id":"260","name":"Swampert","desc":"Swampert predicts storms by sensing subtle differences in the sounds of waves and tidal winds with its fins. If a storm is approaching, it piles up boulders to protect itself."},
	{"id":"261","name":"Poochyena","desc":"Poochyena is an omnivore--it will eat anything. A distinguishing feature is how large its fangs are compared to its body. This Pokemon tries to intimidate its foes by making the hair on its tail bristle out."},
	{"id":"262","name":"Mightyena","desc":"Mightyena travel and act as a pack in the wild. The memory of its life in the wild compels the Pokemon to obey only those Trainers that it recognizes to possess superior skill."},
	{"id":"263","name":"Zigzagoon","desc":"The hair on Zigzagoon's back is bristly. It rubs the hard back hair against trees to leave its territorial markings. This Pokemon may play dead to fool foes in battle."},
	{"id":"264","name":"Linoone","desc":"When hunting, Linoone will make a beeline straight for the prey at a full run. While this Pokemon is capable of topping 60 mph, it has to come to a screeching halt before it can turn."},
	{"id":"265","name":"Wurmple","desc":"Wurmple is targeted by Swellow as prey. This Pokemon will try to resist by pointing the spikes on its rear at the attacking predator. It will weaken the foe by leaking poison from the spikes."},
	{"id":"266","name":"Silcoon","desc":"Silcoon was thought to endure hunger and not consume anything before its evolution. However, it is now thought that this Pokemon slakes its thirst by drinking rainwater that collects on its silk."},
	{"id":"267","name":"Beautifly","desc":"Beautifly has a long mouth like a coiled needle, which is very convenient for collecting pollen from flowers. This Pokemon rides the spring winds as it flits around gathering pollen."},
	{"id":"268","name":"Cascoon","desc":"If it is attacked, Cascoon remains motionless however badly it may be hurt. It does so because if it were to move, its body would be weak upon evolution. This Pokemon will also not forget the pain it endured."},
	{"id":"269","name":"Dustox","desc":"When Dustox flaps its wings, a fine dust is scattered all over. This dust is actually a powerful poison that will even make a pro wrestler sick. This Pokemon searches for food using its antennae like radar."},
	{"id":"270","name":"Lotad","desc":"Lotad is said to have dwelled on land before. However, this Pokemon is thought to have returned to water because the leaf on its head grew large and heavy. It now lives by floating atop the water."},
	{"id":"271","name":"Lombre","desc":"Lombre's entire body is covered by a slippery, slimy film. It feels horribly unpleasant to be touched by this Pokemon's hands. Lombre is often mistaken for a human child."},
	{"id":"272","name":"Ludicolo","desc":"Upon hearing an upbeat and cheerful rhythm, the cells in Ludicolo's body become very energetic and active. Even in battle, this Pokemon will exhibit an amazing amount of power."},
	{"id":"273","name":"Seedot","desc":"Seedot looks exactly like an acorn when it is dangling from a tree branch. It startles other Pokemon by suddenly moving. This Pokemon polishes its body once a day using leaves."},
	{"id":"274","name":"Nuzleaf","desc":"This Pokemon pulls out the leaf on its head and makes a flute with it. The sound of Nuzleaf's flute strikes fear and uncertainty in the hearts of people lost in a forest."},
	{"id":"275","name":"Shiftry","desc":"Shiftry's large fans generate awesome gusts of wind at a speed close to 100 feet per second. The whipped-up wind blows anything away. This Pokemon chooses to live quietly deep in forests."},
	{"id":"276","name":"Taillow","desc":"Taillow is young--it has only just left its nest. As a result, it sometimes becomes lonesome and cries at night. This Pokemon feeds on Wurmple that live in forests."},
	{"id":"277","name":"Swellow","desc":"Swellow is very conscientious about the upkeep of its glossy wings. Once two Swellow are gathered, they diligently take care of cleaning each other's wings."},
	{"id":"278","name":"Wingull","desc":"Wingull rides updrafts rising from the sea by extending its long and narrow wings to glide. This Pokemon's long beak is useful for catching prey."},
	{"id":"279","name":"Pelipper","desc":"Pelipper searches for food while in flight by skimming the wave tops. This Pokemon dips its large bill in the sea to scoop up food, then swallows everything in one big gulp."},
	{"id":"280","name":"Ralts","desc":"Ralts has the ability to sense the emotions of people. If its Trainer is in a cheerful mood, this Pokemon grows cheerful and joyous in the same way."},
	{"id":"281","name":"Kirlia","desc":"Kirlia uses the horns on its head to amplify its psychokinetic power. When the Pokemon uses its power, the air around it becomes distorted, creating mirages of nonexistent scenery."},
	{"id":"282","name":"Gardevoir","desc":"Gardevoir has the psychokinetic power to distort the dimensions and create a small black hole. This Pokemon will try to protect its Trainer even at the risk of its own life."},
	{"id":"283","name":"Surskit","desc":"If Surskit senses danger, it secretes a thick, sugary syrup from the tip of its head. There are some Pokemon that love eating this syrup."},
	{"id":"284","name":"Masquerain","desc":"Masquerain's antennas have eyelike patterns that usually give it an angry look. If the \"eyes\" are droopy and appear sad, it is said to be a sign that a heavy rainfall is on its way."},
	{"id":"285","name":"Shroomish","desc":"If Shroomish senses danger, it shakes its body and scatters spores from the top of its head. This Pokemon's spores are so toxic, they make trees and weeds wilt."},
	{"id":"286","name":"Breloom","desc":"The seeds ringing Breloom's tail are made of hardened toxic spores. It is horrible to eat the seeds. Just taking a bite of this Pokemon's seed will cause your stomach to rumble."},
	{"id":"287","name":"Slakoth","desc":"Slakoth's heart beats just once a minute. Whatever happens, it is content to loaf around motionless. It is rare to see this Pokemon in motion."},
	{"id":"288","name":"Vigoroth","desc":"Vigoroth is simply incapable of remaining still. Even when it tries to sleep, the blood in its veins grows agitated, compelling this Pokemon to run wild throughout the jungle before it can settle down."},
	{"id":"289","name":"Slaking","desc":"Wherever Slaking live, rings of over a yard in diameter appear in grassy fields. They are made by the Pokemon as it eats all the grass within reach while lying prone on the ground."},
	{"id":"290","name":"Nincada","desc":"Nincada lives underground. It uses its sharp claws to carve the roots of trees and absorb moisture and nutrients. This Pokemon can't withstand bright sunlight so avoids it."},
	{"id":"291","name":"Ninjask","desc":"If Ninjask is not trained properly, it will refuse to obey the Trainer and cry loudly continuously. Because of this quality, this Pokemon is said to be one that puts the Trainer's abilities to the test."},
	{"id":"292","name":"Shedinja","desc":"Shedinja is a peculiar Pokemon. It seems to appear unsought in a Poke Ball after a Nincada evolves. This bizarre Pokemon is entirely immobile--it doesn't even breathe."},
	{"id":"293","name":"Whismur","desc":"Whismur is very timid. If it starts to cry loudly, it becomes startled by its own crying and cries even harder. When it finally stops crying, the Pokemon goes to sleep, all tired out."},
	{"id":"294","name":"Loudred","desc":"Loudred shouts while stamping its feet. After it finishes shouting, this Pokemon becomes incapable of hearing anything for a while. This is considered to be a weak point."},
	{"id":"295","name":"Exploud","desc":"Exploud communicates its feelings to the others by emitting whistle-like sounds from the tubes on its body. This Pokemon only raises its voice when it is in battle."},
	{"id":"296","name":"Makuhita","desc":"Makuhita has a tireless spirit--it will never give up hope. It eats a lot of food, gets plenty of sleep, and it trains very rigorously. By living that way, this Pokemon packs its body with energy."},
	{"id":"297","name":"Hariyama","desc":"Hariyama's thick body may appear fat, but it is actually a hunk of solid muscle. If this Pokemon bears down and tightens all its muscles, its body becomes as hard as a rock."},
	{"id":"298","name":"Azurill","desc":"Azurill's tail is large and bouncy. It is packed full of the nutrients this Pokemon needs to grow. Azurill can be seen bouncing and playing on its big, rubbery tail."},
	{"id":"299","name":"Nosepass","desc":"Nosepass had been said to be completely unmoving, with its magnetic nose pointed due north. However, close observation has revealed that the Pokemon actually moves by a little over 3/8 of an inch every year."},
	{"id":"300","name":"Skitty","desc":"Skitty is known to chase around playfully after its own tail. In the wild, this Pokemon lives in holes in the trees of forests. It is very popular as a pet because of its adorable looks."},
	{"id":"301","name":"Delcatty","desc":"Delcatty sleeps anywhere it wants without keeping a permanent nest. If other Pokemon approach it as it sleeps, this Pokemon will never fight--it will just move away somewhere else."},
	{"id":"302","name":"Sableye","desc":"Sableye digs the ground with sharpened claws to find rocks that it eats. Substances in the eaten rocks crystallize and rise up to the Pokemon's body surface."},
	{"id":"303","name":"Mawile","desc":"Don't be taken in by this Pokemon's cute face--it's very dangerous. Mawile fools the foe into letting down its guard, then chomps down with its massive jaws. The steel jaws are really horns that have been transformed."},
	{"id":"304","name":"Aron","desc":"Aron has a body of steel. With one all-out charge, this Pokemon can demolish even a heavy dump truck. The destroyed dump truck then becomes a handy meal for the Pokemon."},
	{"id":"305","name":"Lairon","desc":"Lairon feeds on iron contained in rocks and water. It makes its nest on mountains where iron ore is buried. As a result, the Pokemon often clashes with humans mining the iron ore."},
	{"id":"306","name":"Aggron","desc":"Aggron is protective of its environment. If its mountain is ravaged by a landslide or a fire, this Pokemon will haul topsoil to the area, plant trees, and beautifully restore its own territory."},
	{"id":"307","name":"Meditite","desc":"Meditite heightens its inner energy through meditation. It survives on just one berry a day. Minimal eating is another aspect of this Pokemon's training."},
	{"id":"308","name":"Medicham","desc":"Through the power of meditation, Medicham developed its sixth sense. It gained the ability to use psychokinetic powers. This Pokemon is known to meditate for a whole month without eating."},
	{"id":"309","name":"Electrike","desc":"Electrike runs faster than the human eye can follow. The friction from running is converted into electricity, which is then stored in this Pokemon's fur."},
	{"id":"310","name":"Manectric","desc":"Manectric discharges strong electricity from its mane. The mane is used for collecting electricity in the atmosphere. This Pokemon creates thunderclouds above its head."},
	{"id":"311","name":"Plusle","desc":"When Plusle is cheering on its partner, it flashes with electric sparks from all over its body. If its partner loses, this Pokemon cries loudly."},
	{"id":"312","name":"Minun","desc":"Minun loves to cheer on its partner in battle. It gives off sparks from its body while it is doing so. If its partner is in trouble, this Pokemon gives off increasing amounts of sparks."},
	{"id":"313","name":"Volbeat","desc":"Volbeat's tail glows like a lightbulb. With other Volbeat, it uses its tail to draw geometric shapes in the night sky. This Pokemon loves the sweet aroma given off by Illumise."},
	{"id":"314","name":"Illumise","desc":"Illumise leads a flight of illuminated Volbeat to draw signs in the night sky. This Pokemon is said to earn greater respect from its peers by composing more complex designs in the sky."},
	{"id":"315","name":"Roselia","desc":"On extremely rare occasions, a Roselia is said to appear with its flowers in unusual colors. The thorns on this Pokemon's head contain a vicious poison."},
	{"id":"316","name":"Gulpin","desc":"Most of Gulpin's body is made up of its stomach--its heart and brain are very small in comparison. This Pokemon's stomach contains special enzymes that dissolve anything."},
	{"id":"317","name":"Swalot","desc":"Swalot has no teeth, so what it eats, it swallows whole, no matter what. Its cavernous mouth yawns widely. An automobile tire could easily fit inside this Pokemon's mouth."},
	{"id":"318","name":"Carvanha","desc":"If anything invades Carvanha's territory, it will swarm and tear at the intruder with its pointed fangs. On its own, however, this Pokemon turns suddenly timid."},
	{"id":"319","name":"Sharpedo","desc":"Sharpedo can swim at speeds of up to 75 mph by jetting seawater out of its backside. This Pokemon's drawback is its inability to swim long distances."},
	{"id":"320","name":"Wailmer","desc":"Wailmer can store water inside its body to transform itself into a ball for bouncing around on the ground. By filling itself up with more water, this Pokemon can elevate the height of its bounces."},
	{"id":"321","name":"Wailord","desc":"When chasing prey, Wailord herds them by leaping out of the water and making a humongous splash. It is breathtaking to see this Pokemon leaping out of the sea with others in its pod."},
	{"id":"322","name":"Numel","desc":"Numel stores magma of almost 2,200 degrees Fahrenheit within its body. If it gets wet, the magma cools and hardens. In that event, the Pokemon's body grows heavy and its movements become sluggish."},
	{"id":"323","name":"Camerupt","desc":"The humps on Camerupt's back are formed by a transformation of its bones. They sometimes blast out molten magma. This Pokemon apparently erupts often when it is enraged."},
	{"id":"324","name":"Torkoal","desc":"Torkoal generates energy by burning coal. It grows weaker as the fire dies down. When it is preparing for battle, this Pokemon burns more coal."},
	{"id":"325","name":"Spoink","desc":"Spoink keeps a pearl on top of its head. The pearl functions to amplify this Pokemon's psychokinetic powers. It is therefore on a constant search for a bigger pearl."},
	{"id":"326","name":"Grumpig","desc":"Grumpig uses the black pearls on its body to wield its fantastic powers. When it is doing so, it dances bizarrely. This Pokemon's black pearls are valuable as works of art."},
	{"id":"327","name":"Spinda","desc":"No two Spinda are said to have identical spot patterns on their hides. This Pokemon moves in a curious manner as if it is stumbling in dizziness. Its lurching movements can cause the opponent to become confused."},
	{"id":"328","name":"Trapinch","desc":"Trapinch is a patient hunter. It digs an inescapable pit in a desert and waits for its prey to come tumbling down. This Pokemon can go a whole week without access to any water."},
	{"id":"329","name":"Vibrava","desc":"Vibrava's wings have not yet completed the process of growing. Rather than flying long distances, they are more useful for generating ultrasonic waves by vibrating."},
	{"id":"330","name":"Flygon","desc":"Flygon whips up a sandstorm by flapping its wings. The wings create a series of notes that sound like singing. Because the \"singing\" is the only thing that can be heard in a sandstorm, this Pokemon is said to be the desert spirit."},
	{"id":"331","name":"Cacnea","desc":"The more arid and harsh the environment, the more pretty and fragrant a flower Cacnea grows. This Pokemon battles by wildly swinging its thorny arms."},
	{"id":"332","name":"Cacturne","desc":"If a traveler is going through a desert in the thick of night, Cacturne will follow in a ragtag group. The Pokemon are biding their time, waiting for the traveler to tire and become incapable of moving."},
	{"id":"333","name":"Swablu","desc":"Swablu loves to make things clean. If it spots something dirty, it will wipe and polish it with its cottony wings. If its wings become dirty, this Pokemon finds a stream and showers itself."},
	{"id":"334","name":"Altaria","desc":"Altaria sings in a gorgeous soprano. Its wings are like cotton clouds. This Pokemon catches updrafts with its buoyant wings and soars way up into the wild blue yonder."},
	{"id":"335","name":"Zangoose","desc":"Zangoose usually stays on all fours, but when angered, it gets up on its hind legs and extends its claws. This Pokemon shares a bitter rivalry with Seviper that dates back over generations."},
	{"id":"336","name":"Seviper","desc":"Seviper's swordlike tail serves two purposes--it slashes foes and douses them with secreted poison. This Pokemon will not give up its long-running blood feud with Zangoose."},
	{"id":"337","name":"Lunatone","desc":"Lunatone becomes active around the time of the full moon. Instead of walking, it moves by floating in midair. The Pokemon's intimidating red eyes cause all those who see it to become transfixed with fear."},
	{"id":"338","name":"Solrock","desc":"Sunlight is the source of Solrock's power. It is said to possess the ability to read the emotions of others. This Pokemon gives off intense heat while rotating its body."},
	{"id":"339","name":"Barboach","desc":"Barboach's body is covered with a slimy film. If a foe grabs it, this Pokemon just slips out of the enemy's grip. This Pokemon grows weak if the slimy coating dries up."},
	{"id":"340","name":"Whiscash","desc":"If Whiscash goes on a wild rampage, it sets off a quake-like tremor with a radius of over three miles. This Pokemon has the ability to predict real earthquakes."},
	{"id":"341","name":"Corphish","desc":"Corphish catches prey with its sharp claws. It has no likes or dislikes when it comes to food--it will eat anything. This Pokemon has no trouble living in filthy water."},
	{"id":"342","name":"Crawdaunt","desc":"Crawdaunt molts (sheds) its shell regularly. Immediately after molting, its shell is soft and tender. Until the shell hardens, this Pokemon hides in its streambed burrow to avoid attack from its foes."},
	{"id":"343","name":"Baltoy","desc":"As soon as it spots others of its kind, Baltoy congregates with them and then begins crying noisily in unison. This Pokemon sleeps while cleverly balancing itself on its one foot."},
	{"id":"344","name":"Claydol","desc":"Claydol is an enigma that appeared from a clay statue made by an ancient civilization dating back 20,000 years. This Pokemon shoots beams from both its hands."},
	{"id":"345","name":"Lileep","desc":"Lileep is an ancient Pokemon that was regenerated from a fossil. It remains permanently anchored to a rock. From its immobile perch, this Pokemon intently scans for prey with its two eyes."},
	{"id":"346","name":"Cradily","desc":"Cradily's body serves as an anchor, preventing it from being washed away in rough seas. This Pokemon secretes a strong digestive fluid from its tentacles."},
	{"id":"347","name":"Anorith","desc":"Anorith is said to be a type of Pokemon predecessor, with eight wings at the sides of its body. This Pokemon swam in the primordial sea by undulating these eight wings."},
	{"id":"348","name":"Armaldo","desc":"Armaldo is a Pokemon species that became extinct in prehistoric times. This Pokemon is said to have walked on its hind legs, which would have been more convenient for life on land."},
	{"id":"349","name":"Feebas","desc":"While Feebas's body is in tatters, it has a hardy and tenacious life force that enables it to live anywhere. However, this Pokemon is also slow and dimwitted, making it an easy catch."},
	{"id":"350","name":"Milotic","desc":"Milotic live at the bottom of large lakes. When this Pokemon's body glows a vivid pink, it releases a pulsing wave of energy that brings soothing calm to troubled hearts."},
	{"id":"351","name":"Castform","desc":"Castform borrows the power of nature to transform itself into the guises of the sun, rain, and snow-clouds. This Pokemon's feelings change with the weather."},
	{"id":"352","name":"Kecleon","desc":"Kecleon alters its body coloration to blend in with its surroundings, allowing it to sneak up on its prey unnoticed. Then it lashes out with its long, stretchy tongue to instantly ensnare the unsuspecting target."},
	{"id":"353","name":"Shuppet","desc":"Shuppet grows by feeding on dark emotions, such as vengefulness and envy, in the hearts of people. It roams through cities in search of grudges that taint people."},
	{"id":"354","name":"Banette","desc":"A cursed energy permeated the stuffing of a discarded and forgotten plush doll, giving it new life as Banette. The Pokemon's energy would escape if it were to ever open its mouth."},
	{"id":"355","name":"Duskull","desc":"Duskull wanders lost among the deep darkness of midnight. There is an oft-told admonishment given to misbehaving children that this Pokemon will spirit away bad children who earn scoldings from their mothers."},
	{"id":"356","name":"Dusclops","desc":"Dusclops absorbs anything, however large the object may be. This Pokemon hypnotizes its foe by waving its hands in a macabre manner and by bringing its single eye to bear. The hypnotized foe is made to do Dusclops's bidding."},
	{"id":"357","name":"Tropius","desc":"Children of the southern tropics eat as snacks the fruit that grows in bunches around the neck of Tropius. This Pokemon flies by flapping the leaves on its back as if they were wings."},
	{"id":"358","name":"Chimecho","desc":"In high winds, Chimecho cries as it hangs from a tree branch or the eaves of a building using a suction cup on its head. This Pokemon plucks berries with its long tail and eats them."},
	{"id":"359","name":"Absol","desc":"Absol has the ability to foretell the coming of natural disasters. It lives in a harsh, rugged mountain environment. This Pokemon very rarely ventures down from the mountains."},
	{"id":"360","name":"Wynaut","desc":"Wynaut gather on moonlit nights to play by squeezing up against each other. By being squeezed, this Pokemon gains endurance and is trained to dole out powerful counterattacks."},
	{"id":"361","name":"Snorunt","desc":"Snorunt survives by eating only snow and ice. Old folklore claims that a house visited by this Pokemon is sure to prosper for many generations to come."},
	{"id":"362","name":"Glalie","desc":"Glalie has the ability to freely control ice. For example, it can instantly freeze its prey solid. After immobilizing its prey in ice, this Pokemon enjoys eating it in leisurely fashion."},
	{"id":"363","name":"Spheal","desc":"Spheal always travels by rolling around on its ball-like body. When the season for ice floes arrives, this Pokemon can be seen rolling about on ice and crossing the sea."},
	{"id":"364","name":"Sealeo","desc":"Sealeo often balances and rolls things on the tip of its nose. While the Pokemon is rolling something, it checks the object's aroma and texture to determine whether it likes the object or not."},
	{"id":"365","name":"Walrein","desc":"Walrein swims all over in frigid seawater while crushing icebergs with its grand, imposing tusks. Its thick layer of blubber makes enemy attacks bounce off harmlessly."},
	{"id":"366","name":"Clamperl","desc":"Clamperl grows while being protected by its rock-hard shell. When its body becomes too large to fit inside the shell, it is sure evidence that this Pokemon is getting close to evolution."},
	{"id":"367","name":"Huntail","desc":"Huntail's tail is shaped like a fish. It uses the tail to attract prey, then swallows the prey whole with its large, gaping mouth. This Pokemon swims by wiggling its slender body like a snake."},
	{"id":"368","name":"Gorebyss","desc":"Although Gorebyss is the very picture of elegance and beauty while swimming, it is also cruel. When it spots prey, this Pokemon inserts its thin mouth into the prey's body and drains the prey of its body fluids."},
	{"id":"369","name":"Relicanth","desc":"Relicanth is a rare species that was discovered in deep-sea explorations. This Pokemon's body withstands the enormous water pressure of the ocean depths. Its body is covered in tough scales that are like craggy rocks."},
	{"id":"370","name":"Luvdisc","desc":"Luvdisc's heart-shaped body is a symbol of love and romance. It is said that any couple meeting this Pokemon is promised a loving relationship that never ends."},
	{"id":"371","name":"Bagon","desc":"Bagon harbors a never-ending dream of one day soaring high among the clouds. As if trying to dispel its frustration over its inability to fly, this Pokemon slams its hard head against huge rocks and shatters them into pebbles."},
	{"id":"372","name":"Shelgon","desc":"Covering Shelgon's body are outgrowths much like bones. The shell is very hard and bounces off enemy attacks. When awaiting evolution, this Pokemon hides away in a cavern."},
	{"id":"373","name":"Salamence","desc":"By evolving into Salamence, this Pokemon finally realizes its long-held dream of growing wings. To express its joy, it flies and wheels all over the sky while spouting flames from its mouth."},
	{"id":"374","name":"Beldum","desc":"Beldum keeps itself floating by generating a magnetic force that repels earth's natural magnetism. When it sleeps, this Pokemon anchors itself to a cliff using the hooks on its rear."},
	{"id":"375","name":"Metang","desc":"When two Beldum fuse together, Metang is formed. The brains of the Beldum are joined by a magnetic nervous system. This Pokemon turns its arms to the rear for traveling at high speed."},
	{"id":"376","name":"Metagross","desc":"Metagross is the result of two Metang achieving fusion. When hunting, this Pokemon pins the prey to the ground under its massive body. It then eats the helpless victim using the large mouth on its stomach."},
	{"id":"377","name":"Regirock","desc":"Regirock's body is composed entirely of rocks. Recently, a study made the startling discovery that the rocks were all unearthed from different locations."},
	{"id":"378","name":"Regice","desc":"Regice cloaks itself with frigid air of -328 degrees Fahrenheit. Things will freeze solid just by going near this Pokemon. Its icy body is so cold, it will not melt even if it is immersed in magma."},
	{"id":"379","name":"Registeel","desc":"Registeel was imprisoned by people in ancient times. The metal composing its body is thought to be a curious substance that is not of this earth."},
	{"id":"380","name":"Latias","desc":"Latias is highly intelligent and capable of understanding human speech. It is covered with a glass-like down. The Pokemon enfolds its body with its down and refracts light to alter its appearance."},
	{"id":"381","name":"Latios","desc":"Latios will only open its heart to a Trainer with a compassionate spirit. This Pokemon can fly faster than a jet plane by folding its forelegs to minimize air resistance."},
	{"id":"382","name":"Kyogre","desc":"Kyogre is said to be the personification of the sea itself. Legends tell of its many clashes against Groudon, as each sought to gain the power of nature."},
	{"id":"383","name":"Groudon","desc":"Through Primal Reversion and with nature's full power, it will take back its true form. It can cause magma to erupt and expand the landmass of the world."},
	{"id":"384","name":"Rayquaza","desc":"It flies forever through the ozone layer, consuming meteoroids for sustenance. The many meteoroids in its body provide the energy it needs to Mega Evolve."},
	{"id":"385","name":"Jirachi","desc":"Jirachi will awaken from its sleep of a thousand years if you sing to it in a voice of purity. It is said to make true any wish that people desire."},
	{"id":"386","name":"Deoxys","desc":"Deoxys emerged from a virus that came from space. It is highly intelligent and wields psychokinetic powers. This Pokemon shoots lasers from the crystalline organ on its chest."},
	{"id":"387","name":"Turtwig","desc":"It undertakes photosynthesis with its body, making oxygen. The leaf on its head wilts if it is thirsty."},
	{"id":"388","name":"Grotle","desc":"It knows where pure water wells up. It carries fellow Pokemon there on its back."},
	{"id":"389","name":"Torterra","desc":"Small Pokemon occasionally gather on its unmoving back to begin building their nests."},
	{"id":"390","name":"Chimchar","desc":"The gas made in its belly burns from its rear end. The fire burns weakly when it feels sick."},
	{"id":"391","name":"Monferno","desc":"It uses ceilings and walls to launch aerial attacks. Its fiery tail is but one weapon."},
	{"id":"392","name":"Infernape","desc":"It tosses its enemies around with agility. It uses all its limbs to fight in its own unique style."},
	{"id":"393","name":"Piplup","desc":"Because it is very proud, it hates accepting food from people. Its thick down guards it from cold."},
	{"id":"394","name":"Prinplup","desc":"It lives a solitary life. Its wings deliver wicked blows that can snap even the thickest of trees."},
	{"id":"395","name":"Empoleon","desc":"The three horns that extend from its beak attest to its power. The leader has the biggest horns."},
	{"id":"396","name":"Starly","desc":"They flock around mountains and fields, chasing after bug Pokemon. Their singing is noisy and annoying."},
	{"id":"397","name":"Staravia","desc":"It lives in forests and fields. Squabbles over territory occur when flocks collide."},
	{"id":"398","name":"Staraptor","desc":"When Staravia evolve into Staraptor, they leave the flock to live alone. They have sturdy wings."},
	{"id":"399","name":"Bidoof","desc":"It constantly gnaws on logs and rocks to whittle down its front teeth. It nests alongside water."},
	{"id":"400","name":"Bibarel","desc":"It makes its nest by damming streams with bark and mud. It is known as an industrious worker."},
	{"id":"401","name":"Kricketot","desc":"When its antennae hit each other, it sounds like the music of a xylophone."},
	{"id":"402","name":"Kricketune","desc":"It signals its emotions with its melodies. Scientists are studying these melodic patterns."},
	{"id":"403","name":"Shinx","desc":"All of its fur dazzles if danger is sensed. It flees while the foe is momentarily blinded."},
	{"id":"404","name":"Luxio","desc":"Strong electricity courses through the tips of its sharp claws. A light scratch causes fainting in foes."},
	{"id":"405","name":"Luxray","desc":"Luxray's ability to see through objects comes in handy when it's scouting for danger."},
	{"id":"406","name":"Budew","desc":"Over the winter, it closes its bud and endures the cold. In spring, the bud opens and releases pollen."},
	{"id":"407","name":"Roserade","desc":"With the movements of a dancer, it strikes with whips that are densely lined with poison thorns."},
	{"id":"408","name":"Cranidos","desc":"A lifelong jungle dweller from 100 million years ago, it would snap obstructing trees with headbutts."},
	{"id":"409","name":"Rampardos","desc":"Its skull is as hard as iron. It is a brute that tears down jungle trees while catching prey."},
	{"id":"410","name":"Shieldon","desc":"It was generated from a fossil dug out of a layer of clay that was older than anyone knows. It has a sturdy face."},
	{"id":"411","name":"Bastiodon","desc":"Any frontal attack is repulsed. It is a docile Pokemon that feeds on grass and berries."},
	{"id":"412","name":"Burmy","desc":"If its cloak is broken in battle, it quickly remakes the cloak with materials nearby."},
	{"id":"413","name":"Wormadam","desc":"When Burmy evolved, its cloak became a part of this Pokemon's body. The cloak is never shed."},
	{"id":"414","name":"Mothim","desc":"It flutters around at night and steals honey from the Combee hive."},
	{"id":"415","name":"Combee","desc":"It collects and delivers honey to its colony. At night, they cluster to form a beehive and sleep."},
	{"id":"416","name":"Vespiquen","desc":"Its abdomen is a honeycomb for grubs. It raises its grubs on honey collected by Combee."},
	{"id":"417","name":"Pachirisu","desc":"A pair may be seen rubbing their cheek pouches together in an effort to share stored electricity."},
	{"id":"418","name":"Buizel","desc":"It inflates the flotation sac around its neck and pokes its head out of the water to see what is going on."},
	{"id":"419","name":"Floatzel","desc":"Its flotation sac developed as a result of pursuing aquatic prey. It can double as a rubber raft."},
	{"id":"420","name":"Cherubi","desc":"It evolves by sucking the energy out of the small ball where it had been storing nutrients."},
	{"id":"421","name":"Cherrim","desc":"If it senses strong sunlight, it opens its folded petals to absorb the sun's rays with its whole body."},
	{"id":"422","name":"Shellos","desc":"Its shape and coloration vary, depending on its habitat."},
	{"id":"423","name":"Gastrodon","desc":"It apparently had a huge shell for protection in ancient times. It lives in shallow tidal pools."},
	{"id":"424","name":"Ambipom","desc":"To eat, it deftly shucks nuts with its two tails. It rarely uses its arms now."},
	{"id":"425","name":"Drifloon","desc":"These Pokemon are called the \"Signpost for Wandering Spirits.\" Children holding them sometimes vanish."},
	{"id":"426","name":"Drifblim","desc":"It's drowsy in daytime, but flies off in the evening in big groups. No one knows where they go."},
	{"id":"427","name":"Buneary","desc":"When it senses danger, it perks up its ears. On cold nights, it sleeps with its head tucked into its fur."},
	{"id":"428","name":"Lopunny","desc":"The ears appear to be delicate. If they are touched roughly, it kicks with its graceful legs."},
	{"id":"429","name":"Mismagius","desc":"Its cries sound like incantations to torment the foe. It appears where you least expect it."},
	{"id":"430","name":"Honchkrow","desc":"Becoming active at night, it is known to swarm with numerous Murkrow in tow."},
	{"id":"431","name":"Glameow","desc":"When it's happy, Glameow demonstrates beautiful movements of its tail, like a dancing ribbon."},
	{"id":"432","name":"Purugly","desc":"To make itself appear intimidatingly beefy, it tightly cinches its waist with its twin tails."},
	{"id":"433","name":"Chingling","desc":"There is an orb inside its mouth. When it hops, the orb bounces all over and makes a ringing sound."},
	{"id":"434","name":"Stunky","desc":"It protects itself by spraying a noxious fluid from its rear. The stench lingers for 24 hours."},
	{"id":"435","name":"Skuntank","desc":"It sprays a stinky fluid from its tail. The fluid smells worse the longer it is allowed to fester."},
	{"id":"436","name":"Bronzor","desc":"Implements shaped like it were discovered in ancient tombs. It is unknown if they are related."},
	{"id":"437","name":"Bronzong","desc":"Ancient people believed that petitioning Bronzong for rain was the way to make crops grow."},
	{"id":"438","name":"Bonsly","desc":"It prefers an arid atmosphere. It leaks water that looks like tears when adjusting its moisture level."},
	{"id":"439","name":"Mime Jr.","desc":"It habitually mimics foes. Once mimicked, the foe cannot take its eyes off this Pokemon."},
	{"id":"440","name":"Happiny","desc":"It carefully carries a round, white rock that it thinks is an egg. It's bothered by how curly its hair looks."},
	{"id":"441","name":"Chatot","desc":"It can learn and speak human words. If they gather, they all learn the same saying."},
	{"id":"442","name":"Spiritomb","desc":"It was bound to a fissure in an odd keystone as punishment for misdeeds 500 years ago."},
	{"id":"443","name":"Gible","desc":"It nests in small, horizontal holes in cave walls. It pounces to catch prey that stray too close."},
	{"id":"444","name":"Gabite","desc":"As it digs to expand its nest, it habitually digs up gems that it then hoards in its nest."},
	{"id":"445","name":"Garchomp","desc":"It flies at speeds equal to a jet fighter plane. It never allows its prey to escape."},
	{"id":"446","name":"Munchlax","desc":"It conceals food under the long fur on its body. It carts around this food stash and swallows it without chewing."},
	{"id":"447","name":"Riolu","desc":"The aura that emanates from its body intensifies to alert others if it is afraid or sad."},
	{"id":"448","name":"Lucario","desc":"By reading the auras of all things, it can tell how others are feeling from over half a mile away."},
	{"id":"449","name":"Hippopotas","desc":"It enshrouds itself with sand to protect itself from germs. It does not enjoy getting wet."},
	{"id":"450","name":"Hippowdon","desc":"It blasts internally stored sand from ports on its body to create a towering twister for attack."},
	{"id":"451","name":"Skorupi","desc":"It burrows under the sand to lie in wait for prey. Its tail claws can inject its prey with a savage poison."},
	{"id":"452","name":"Drapion","desc":"It has the power in its clawed arms to make scrap of a car. The tips of its claws release poison."},
	{"id":"453","name":"Croagunk","desc":"Inflating its poison sacs, it fills the area with an odd sound and hits flinching opponents with a poison jab."},
	{"id":"454","name":"Toxicroak","desc":"Its knuckle claws secrete a toxin so vile that even a scratch could prove fatal."},
	{"id":"455","name":"Carnivine","desc":"It binds itself to trees in marshes. It attracts prey with its sweet-smelling drool and gulps them down."},
	{"id":"456","name":"Finneon","desc":"After long exposure to sunlight, the patterns on its tail fins shine vividly when darkness arrives."},
	{"id":"457","name":"Lumineon","desc":"To avoid detection by predators, it crawls along the seafloor using the two fins on its chest."},
	{"id":"458","name":"Mantyke","desc":"When it swims close to the surface of the ocean, people aboard ships are able to observe the pattern on its back."},
	{"id":"459","name":"Snover","desc":"In the spring, it grows berries with the texture of frozen treats around its belly."},
	{"id":"460","name":"Abomasnow","desc":"It lives a quiet life on mountains that are perpetually covered in snow. It hides itself by whipping up blizzards."},
	{"id":"461","name":"Weavile","desc":"They live in cold regions, forming groups of four or five that hunt prey with impressive coordination."},
	{"id":"462","name":"Magnezone","desc":"It evolved from exposure to a special magnetic field. Three units generate magnetism."},
	{"id":"463","name":"Lickilicky","desc":"Their saliva contains lots of components that can dissolve anything. The numbness caused by their lick does not dissipate."},
	{"id":"464","name":"Rhyperior","desc":"It puts rocks in holes in its palms and uses its muscles to shoot them. Geodude are shot at rare times."},
	{"id":"465","name":"Tangrowth","desc":"Its vines grow so profusely that, in the warm season, you can't even see its eyes."},
	{"id":"466","name":"Electivire","desc":"It pushes the tips of its two tails against the foe, then lets loose with over 20,000 volts of power."},
	{"id":"467","name":"Magmortar","desc":"It blasts fireballs of over 3,600 degrees Fahrenheit out of its arms. Its breath also sears and sizzles."},
	{"id":"468","name":"Togekiss","desc":"It shares many blessings with people who respect one another's rights and avoid needless strife."},
	{"id":"469","name":"Yanmega","desc":"This six-legged Pokemon is easily capable of transporting an adult in flight. The wings on its tail help it stay balanced."},
	{"id":"470","name":"Leafeon","desc":"Just like a plant, it uses photosynthesis. As a result, it is always enveloped in clear air."},
	{"id":"471","name":"Glaceon","desc":"It lowers its body heat to freeze its fur. The hairs then become like needles it can fire."},
	{"id":"472","name":"Gliscor","desc":"Its flight is soundless. It uses its lengthy tail to carry off its prey... Then its elongated fangs do the rest."},
	{"id":"473","name":"Mamoswine","desc":"Its impressive tusks are made of ice. The population thinned when it turned warm after the ice age."},
	{"id":"474","name":"Porygon-Z","desc":"Its programming was modified to enable it to travel through alien dimensions. Seems there might have been an error..."},
	{"id":"475","name":"Gallade","desc":"A master of courtesy and swordsmanship, it fights using extending swords on its elbows."},
	{"id":"476","name":"Probopass","desc":"It freely controls three small units called Mini-Noses using magnetic force."},
	{"id":"477","name":"Dusknoir","desc":"The antenna on its head captures radio waves from the world of spirits that command it to take people there."},
	{"id":"478","name":"Froslass","desc":"Legends in snowy regions say that a woman who was lost on an icy mountain was reborn as Froslass."},
	{"id":"479","name":"Rotom","desc":"Its body is composed of plasma. It is known to infiltrate electronic devices and wreak havoc."},
	{"id":"480","name":"Uxie","desc":"It is said that its emergence gave humans the intelligence to improve their quality of life."},
	{"id":"481","name":"Mesprit","desc":"It sleeps at the bottom of a lake. Its spirit is said to leave its body to fly on the lake's surface."},
	{"id":"482","name":"Azelf","desc":"It is thought that Uxie, Mesprit, and Azelf all came from the same egg."},
	{"id":"483","name":"Dialga","desc":"It has the power to control time. It appears in Sinnoh-region myths as an ancient deity."},
	{"id":"484","name":"Palkia","desc":"It has the ability to distort space. It is described as a deity in Sinnoh-region mythology."},
	{"id":"485","name":"Heatran","desc":"Boiling blood, like magma, circulates through its body. It makes its dwelling place in volcanic caves."},
	{"id":"486","name":"Regigigas","desc":"There is an enduring legend that states this Pokemon towed continents with ropes."},
	{"id":"487","name":"Giratina","desc":"It was banished for its violence. It silently gazed upon the old world from the Distortion World."},
	{"id":"488","name":"Cresselia","desc":"Those who sleep holding Cresselia's feather are assured of joyful dreams. It is said to represent the crescent moon."},
	{"id":"489","name":"Phione","desc":"It drifts in warm seas. It always returns to where it was born, no matter how far it may have drifted."},
	{"id":"490","name":"Manaphy","desc":"It starts its life with a wondrous power that permits it to bond with any kind of Pokemon."},
	{"id":"491","name":"Darkrai","desc":"It can lull people to sleep and make them dream. It is active during nights of the new moon."},
	{"id":"492","name":"Shaymin","desc":"The blooming of Gracidea flowers confers the power of flight upon it. Feelings of gratitude are the message it delivers."},
	{"id":"493","name":"Arceus","desc":"It is told in mythology that this Pokemon was born before the universe even existed."},
	{"id":"494","name":"Victini","desc":"When it shares the infinite energy it creates, that being's entire body will be overflowing with power."},
	{"id":"495","name":"Snivy","desc":"They photosynthesize by bathing their tails in sunlight. When they are not feeling well, their tails droop."},
	{"id":"496","name":"Servine","desc":"When it gets dirty, its leaves can't be used in photosynthesis, so it always keeps itself clean."},
	{"id":"497","name":"Serperior","desc":"It can stop its opponents' movements with just a glare. It takes in solar energy and boosts it internally."},
	{"id":"498","name":"Tepig","desc":"It loves to eat roasted berries, but sometimes it gets too excited and burns them to a crisp."},
	{"id":"499","name":"Pignite","desc":"When its internal fire flares up, its movements grow sharper and faster. When in trouble, it emits smoke."},
	{"id":"500","name":"Emboar","desc":"It has mastered fast and powerful fighting moves. It grows a beard of fire."},
	{"id":"501","name":"Oshawott","desc":"It fights using the scalchop on its stomach. In response to an attack, it retaliates immediately by slashing."},
	{"id":"502","name":"Dewott","desc":"As a result of strict training, each Dewott learns different forms for using the scalchops."},
	{"id":"503","name":"Samurott","desc":"One swing of the sword incorporated in its armor can fell an opponent. A simple glare from one of them quiets everybody."},
	{"id":"504","name":"Patrat","desc":"Extremely cautious, one of them will always be on the lookout, but it won't notice a foe coming from behind."},
	{"id":"505","name":"Watchog","desc":"When they see an enemy, their tails stand high, and they spit the seeds of berries stored in their cheek pouches."},
	{"id":"506","name":"Lillipup","desc":"Though it is a very brave Pokemon, it's also smart enough to check its foe's strength and avoid battle."},
	{"id":"507","name":"Herdier","desc":"It has black, cape-like fur that is very hard and decreases the amount of damage it receives."},
	{"id":"508","name":"Stoutland","desc":"Being wrapped in its long fur is so comfortable that a person would be fine even overnight on a wintry mountain."},
	{"id":"509","name":"Purrloin","desc":"They steal from people for fun, but their victims can't help but forgive them. Their deceptively cute act is perfect."},
	{"id":"510","name":"Liepard","desc":"Stealthily, it sneaks up on its target, striking from behind before its victim has a chance to react."},
	{"id":"511","name":"Pansage","desc":"It's good at finding berries and gathers them from all over. It's kind enough to share them with friends."},
	{"id":"512","name":"Simisage","desc":"Ill tempered, it fights by swinging its barbed tail around wildly. The leaf growing on its head is very bitter."},
	{"id":"513","name":"Pansear","desc":"This Pokemon lives in caves in volcanoes. The fire within the tuft on its head can reach 600 degrees Fahrenheit."},
	{"id":"514","name":"Simisear","desc":"When it gets excited, embers rise from its head and tail and it gets hot. For some reason, it loves sweets."},
	{"id":"515","name":"Panpour","desc":"The water stored inside the tuft on its head is full of nutrients. Plants that receive its water grow large."},
	{"id":"516","name":"Simipour","desc":"It prefers places with clean water. When its tuft runs low, it replenishes it by siphoning up water with its tail."},
	{"id":"517","name":"Munna","desc":"It eats the dreams of people and Pokemon. When it eats a pleasant dream, it expels pink-colored mist."},
	{"id":"518","name":"Musharna","desc":"The dream mist coming from its forehead changes into many different colors depending on the dream that was eaten."},
	{"id":"519","name":"Pidove","desc":"These Pokemon live in cities. They are accustomed to people. Flocks often gather in parks and plazas."},
	{"id":"520","name":"Tranquill","desc":"No matter where in the world it goes, it knows where its nest is, so it never gets separated from its Trainer."},
	{"id":"521","name":"Unfezant","desc":"Males have plumage on their heads. They will never let themselves feel close to anyone other than their Trainers."},
	{"id":"522","name":"Blitzle","desc":"Its mane shines when it discharges electricity. They use the frequency and rhythm of these flashes to communicate."},
	{"id":"523","name":"Zebstrika","desc":"They have lightning-like movements. When Zebstrika run at full speed, the sound of thunder reverberates."},
	{"id":"524","name":"Roggenrola","desc":"They were discovered a hundred years ago in an earthquake fissure. Inside each one is an energy core."},
	{"id":"525","name":"Boldore","desc":"When it is healthy, its core sticks out. Always facing the same way, it swiftly moves front to back and left to right."},
	{"id":"526","name":"Gigalith","desc":"Compressing the energy from its internal core lets it fire off an attack capable of blowing away a mountain."},
	{"id":"527","name":"Woobat","desc":"The heart-shaped mark left on a body after a Woobat has been attached to it is said to bring good fortune."},
	{"id":"528","name":"Swoobat","desc":"Anyone who comes into contact with the ultrasonic waves emitted by a courting male experiences a positive mood shift."},
	{"id":"529","name":"Drilbur","desc":"By spinning its body, it can dig straight through the ground at a speed of 30 mph."},
	{"id":"530","name":"Excadrill","desc":"More than 300 feet below the surface, they build mazelike nests. Their activity can be destructive to subway tunnels."},
	{"id":"531","name":"Audino","desc":"It touches others with the feelers on its ears, using the sound of their heartbeats to tell how they are feeling."},
	{"id":"532","name":"Timburr","desc":"Always carrying squared logs, they help out with construction. As they grow, they carry bigger logs."},
	{"id":"533","name":"Gurdurr","desc":"This Pokemon is so muscular and strongly built that even a group of wrestlers could not make it budge an inch."},
	{"id":"534","name":"Conkeldurr","desc":"Rather than rely on force, they master moves that utilize the centrifugal force of spinning concrete."},
	{"id":"535","name":"Tympole","desc":"By vibrating its cheeks, it emits sound waves imperceptible to humans. It uses the rhythm of these sounds to talk."},
	{"id":"536","name":"Palpitoad","desc":"It lives in the water and on land. It uses its long, sticky tongue to immobilize its opponents."},
	{"id":"537","name":"Seismitoad","desc":"They shoot paralyzing liquid from their head bumps. They use vibration to hurt their opponents."},
	{"id":"538","name":"Throh","desc":"When it encounters a foe bigger than itself, it wants to throw it. It changes belts as it gets stronger."},
	{"id":"539","name":"Sawk","desc":"Tying their belts gets them pumped and makes their punches more destructive. Disturbing their training angers them."},
	{"id":"540","name":"Sewaddle","desc":"Since this Pokemon makes its own clothes out of leaves, it is a popular mascot for fashion designers."},
	{"id":"541","name":"Swadloon","desc":"It protects itself from the cold by wrapping up in leaves. It stays on the move, eating leaves in forests."},
	{"id":"542","name":"Leavanny","desc":"It keeps its eggs warm with heat from fermenting leaves. It also uses leaves to make warm wrappings for Sewaddle."},
	{"id":"543","name":"Venipede","desc":"Its bite injects a potent poison, enough to paralyze large bird Pokemon that try to prey on it."},
	{"id":"544","name":"Whirlipede","desc":"It is usually motionless, but when attacked, it rotates at high speed and then crashes into its opponent."},
	{"id":"545","name":"Scolipede","desc":"With quick movements, it chases down its foes, attacking relentlessly with its horns until it prevails."},
	{"id":"546","name":"Cottonee","desc":"Perhaps because they feel more at ease in a group, they stick to others they find. They end up looking like a cloud."},
	{"id":"547","name":"Whimsicott","desc":"Like the wind, it can slip through any gap, no matter how small. It leaves balls of white fluff behind."},
	{"id":"548","name":"Petilil","desc":"Since they prefer moist, nutrient-rich soil, the areas where Petilil live are known to be good for growing plants."},
	{"id":"549","name":"Lilligant","desc":"Even veteran Trainers face a challenge in getting its beautiful flower to bloom. This Pokemon is popular with celebrities."},
	{"id":"550","name":"Basculin","desc":"Red and blue Basculin usually do not get along, but sometimes members of one school mingle with the other's school."},
	{"id":"551","name":"Sandile","desc":"They live buried in the sands of the desert. The sun-warmed sands prevent their body temperature from dropping."},
	{"id":"552","name":"Krokorok","desc":"The special membrane covering its eyes can sense the heat of objects, so it can see its surroundings even in darkness."},
	{"id":"553","name":"Krookodile","desc":"They never allow prey to escape. Their jaws are so powerful, they can crush the body of an automobile."},
	{"id":"554","name":"Darumaka","desc":"When it sleeps, it pulls its limbs into its body and its internal fire goes down to 1,100 degrees Fahrenheit."},
	{"id":"555","name":"Darmanitan","desc":"Its internal fire burns at 2,500 degrees Fahrenheit, making enough power that it can destroy a dump truck with one punch."},
	{"id":"556","name":"Maractus","desc":"Arid regions are their habitat. They move rhythmically, making a sound similar to maracas."},
	{"id":"557","name":"Dwebble","desc":"When it finds a stone of a suitable size, it secretes a liquid from its mouth to open up a hole to crawl into."},
	{"id":"558","name":"Crustle","desc":"Competing for territory, Crustle fight viciously. The one whose boulder is broken is the loser of the battle."},
	{"id":"559","name":"Scraggy","desc":"Proud of its sturdy skull, it suddenly headbutts everything, but its weight makes it unstable, too."},
	{"id":"560","name":"Scrafty","desc":"It can smash concrete blocks with its kicking attacks. The one with the biggest crest is the group leader."},
	{"id":"561","name":"Sigilyph","desc":"The guardians of an ancient city, they always fly the same route while keeping watch for invaders."},
	{"id":"562","name":"Yamask","desc":"Each of them carries a mask that used to be its face when it was human. Sometimes they look at it and cry."},
	{"id":"563","name":"Cofagrigus","desc":"Grave robbers who mistake them for real coffins and get too close end up trapped inside their bodies."},
	{"id":"564","name":"Tirtouga","desc":"Restored from a fossil, this Pokemon can dive to depths beyond half a mile."},
	{"id":"565","name":"Carracosta","desc":"It could knock out a foe with a slap from one of its developed front appendages and chew it up, shell or bones and all."},
	{"id":"566","name":"Archen","desc":"Said to be an ancestor of bird Pokemon, they were unable to fly and moved about by hopping from one branch to another."},
	{"id":"567","name":"Archeops","desc":"It runs better than it flies. It takes off into the sky by running at a speed of 25 mph."},
	{"id":"568","name":"Trubbish","desc":"Inhaling the gas they belch will make you sleep for a week. They prefer unsanitary places."},
	{"id":"569","name":"Garbodor","desc":"Consuming garbage makes new kinds of poison gases and liquids inside their bodies."},
	{"id":"570","name":"Zorua","desc":"To protect themselves from danger, they hide their true identities by transforming into people and Pokemon."},
	{"id":"571","name":"Zoroark","desc":"Bonds between these Pokemon are very strong. It protects the safety of its pack by tricking its opponents."},
	{"id":"572","name":"Minccino","desc":"These Pokemon prefer a tidy habitat. They are always sweeping and dusting, using their tails as brooms."},
	{"id":"573","name":"Cinccino","desc":"Cinccino's body is coated in a special oil that helps it deflect attacks, such as punches."},
	{"id":"574","name":"Gothita","desc":"They intently observe both Trainers and Pokemon. Apparently, they are looking at something that only Gothita can see."},
	{"id":"575","name":"Gothorita","desc":"According to many old tales, it creates friends for itself by controlling sleeping children on starry nights."},
	{"id":"576","name":"Gothitelle","desc":"They can predict the future from the placement and movement of the stars. They can see Trainers' life spans."},
	{"id":"577","name":"Solosis","desc":"They drive away attackers by unleashing psychic power. They can use telepathy to talk with others."},
	{"id":"578","name":"Duosion","desc":"When their two divided brains think the same thoughts, their psychic power is maximized."},
	{"id":"579","name":"Reuniclus","desc":"When Reuniclus shake hands, a network forms between their brains, increasing their psychic power."},
	{"id":"580","name":"Ducklett","desc":"They are better at swimming than flying, and they happily eat their favorite food, peat moss, as they dive underwater."},
	{"id":"581","name":"Swanna","desc":"Swanna start to dance at dusk. The one dancing in the middle is the leader of the flock."},
	{"id":"582","name":"Vanillite","desc":"This Pokemon formed from icicles bathed in energy from the morning sun. It sleeps buried in snow."},
	{"id":"583","name":"Vanillish","desc":"Snowy mountains are this Pokemon's habitat. During an ancient ice age, they moved to southern areas."},
	{"id":"584","name":"Vanilluxe","desc":"Swallowing large amounts of water, they make snow clouds inside their bodies and, when angry, cause violent blizzards."},
	{"id":"585","name":"Deerling","desc":"The turning of the seasons changes the color and scent of this Pokemon's fur. People use it to mark the seasons."},
	{"id":"586","name":"Sawsbuck","desc":"They migrate according to the seasons, so some people call Sawsbuck the harbingers of spring."},
	{"id":"587","name":"Emolga","desc":"The energy made in its cheeks' electric pouches is stored inside its membrane and released while it is gliding."},
	{"id":"588","name":"Karrablast","desc":"For some reason they evolve when they receive electrical energy while they are attacking Shelmet."},
	{"id":"589","name":"Escavalier","desc":"These Pokemon evolve by wearing the shell covering of a Shelmet. The steel armor protects their whole body."},
	{"id":"590","name":"Foongus","desc":"It lures Pokemon with its pattern that looks just like a Poke Ball, then releases poison spores."},
	{"id":"591","name":"Amoonguss","desc":"It lures prey close by dancing and waving its arm caps, which resemble Poke Balls, in a swaying motion."},
	{"id":"592","name":"Frillish","desc":"If its veil-like arms stun and wrap a foe, that foe will be dragged miles below the surface, never to return."},
	{"id":"593","name":"Jellicent","desc":"The fate of the ships and crew that wander into Jellicent's habitat: all sunken, all lost, all vanished."},
	{"id":"594","name":"Alomomola","desc":"It gently holds injured and weak Pokemon in its fins. Its special membrane heals their wounds."},
	{"id":"595","name":"Joltik","desc":"They attach themselves to large-bodied Pokemon and absorb static electricity, which they store in an electric pouch."},
	{"id":"596","name":"Galvantula","desc":"When attacked, they create an electric barrier by spitting out many electrically charged threads."},
	{"id":"597","name":"Ferroseed","desc":"It absorbs the iron it finds in the rock while clinging to the ceiling. It shoots spikes when in danger."},
	{"id":"598","name":"Ferrothorn","desc":"They attach themselves to cave ceilings, firing steel spikes at targets passing beneath them."},
	{"id":"599","name":"Klink","desc":"The two minigears that mesh together are predetermined. Each will rebound from other minigears without meshing."},
	{"id":"600","name":"Klang","desc":"A minigear and big gear comprise its body. If the minigear it launches at a foe doesn't return, it will die."},
	{"id":"601","name":"Klinklang","desc":"Its red core functions as an energy tank. It fires the charged energy through its spikes into an area."},
	{"id":"602","name":"Tynamo","desc":"One alone can emit only a trickle of electricity, so a group of them gathers to unleash a powerful electric shock."},
	{"id":"603","name":"Eelektrik","desc":"These Pokemon have a big appetite. When they spot their prey, they attack it and paralyze it with electricity."},
	{"id":"604","name":"Eelektross","desc":"They crawl out of the ocean using their arms. They will attack prey on shore and immediately drag it into the ocean."},
	{"id":"605","name":"Elgyem","desc":"Rumors of its origin are linked to a UFO crash site in the desert 50 years ago."},
	{"id":"606","name":"Beheeyem","desc":"It uses psychic power to control an opponent's brain and tamper with its memories."},
	{"id":"607","name":"Litwick","desc":"Litwick shines a light that absorbs the life energy of people and Pokemon, which becomes the fuel that it burns."},
	{"id":"608","name":"Lampent","desc":"It arrives near the moment of death and steals spirit from the body."},
	{"id":"609","name":"Chandelure","desc":"The spirits burned up in its ominous flame lose their way and wander this world forever."},
	{"id":"610","name":"Axew","desc":"They mark their territory by leaving gashes in trees with their tusks. If a tusk breaks, a new one grows in quickly."},
	{"id":"611","name":"Fraxure","desc":"A broken tusk will not grow back, so it diligently sharpens its tusks on river rocks after the end of a battle."},
	{"id":"612","name":"Haxorus","desc":"Their sturdy tusks will stay sharp even if used to cut steel beams. These Pokemon are covered in hard armor."},
	{"id":"613","name":"Cubchoo","desc":"Their snot is a barometer of health. When healthy, their snot is sticky and the power of their ice moves increases."},
	{"id":"614","name":"Beartic","desc":"It freezes its breath to create fangs and claws of ice to fight with. Cold northern areas are its habitat."},
	{"id":"615","name":"Cryogonal","desc":"They are composed of ice crystals. They capture prey with chains of ice, freezing the prey at -148 degrees Fahrenheit."},
	{"id":"616","name":"Shelmet","desc":"It evolves when bathed in an electric-like energy along with Karrablast. The reason is still unknown."},
	{"id":"617","name":"Accelgor","desc":"When its body dries out, it weakens. So, to prevent dehydration, it wraps itself in many layers of thin membrane."},
	{"id":"618","name":"Stunfisk","desc":"It conceals itself in the mud of the seashore. Then it waits. When prey touch it, it delivers a jolt of electricity."},
	{"id":"619","name":"Mienfoo","desc":"In fights, they dominate with onslaughts of flowing, continuous attacks. With their sharp claws, they cut enemies."},
	{"id":"620","name":"Mienshao","desc":"Using the long fur on its arms like whips, it launches into combo attacks that, once started, no one can stop."},
	{"id":"621","name":"Druddigon","desc":"It warms its body by absorbing sunlight with its wings. When its body temperature falls, it can no longer move."},
	{"id":"622","name":"Golett","desc":"Ancient science fashioned this Pokemon from clay. It's been active for thousands of years."},
	{"id":"623","name":"Golurk","desc":"It flies across the sky at Mach speeds. Removing the seal on its chest makes its internal energy go out of control."},
	{"id":"624","name":"Pawniard","desc":"Ignoring their injuries, groups attack by sinking the blades that cover their bodies into their prey."},
	{"id":"625","name":"Bisharp","desc":"Bisharp pursues prey in the company of a large group of Pawniard. Then Bisharp finishes off the prey."},
	{"id":"626","name":"Bouffalant","desc":"Their fluffy fur absorbs damage, even if they strike foes with a fierce headbutt."},
	{"id":"627","name":"Rufflet","desc":"They will challenge anything, even strong opponents, without fear. Their frequent fights help them become stronger."},
	{"id":"628","name":"Braviary","desc":"They fight for their friends without any thought about danger to themselves. One can carry a car while flying."},
	{"id":"629","name":"Vullaby","desc":"Their wings are too tiny to allow them to fly. They guard their posteriors with bones that were gathered by Mandibuzz."},
	{"id":"630","name":"Mandibuzz","desc":"Watching from the sky, they swoop to strike weakened Pokemon on the ground. They decorate themselves with bones."},
	{"id":"631","name":"Heatmor","desc":"It draws in air through its tail, transforms it into fire, and uses it like a tongue. It melts Durant and eats them."},
	{"id":"632","name":"Durant","desc":"They attack in groups, covering themselves in steel armor to protect themselves from Heatmor."},
	{"id":"633","name":"Deino","desc":"Lacking sight, it's unaware of its surroundings, so it bumps into things and eats anything that moves."},
	{"id":"634","name":"Zweilous","desc":"After it has eaten up all the food in its territory, it moves to another area. Its two heads do not get along."},
	{"id":"635","name":"Hydreigon","desc":"It responds to movement by attacking. This scary, three-headed Pokemon devours everything in its path!"},
	{"id":"636","name":"Larvesta","desc":"The base of volcanoes is where they make their homes. They shoot fire from their five horns to repel attacking enemies."},
	{"id":"637","name":"Volcarona","desc":"When volcanic ash darkened the atmosphere, it is said that Volcarona's fire provided a replacement for the sun."},
	{"id":"638","name":"Cobalion","desc":"It has a body and heart of steel. It worked with its allies to punish people when they hurt Pokemon."},
	{"id":"639","name":"Terrakion","desc":"Spoken of in legend, this Pokemon used its phenomenal power to destroy a castle in its effort to protect Pokemon."},
	{"id":"640","name":"Virizion","desc":"Legends say this Pokemon confounded opponents with its swift movements."},
	{"id":"641","name":"Tornadus","desc":"Tornadus expels massive energy from its tail, causing severe storms. Its power is great enough to blow houses away."},
	{"id":"642","name":"Thundurus","desc":"As it flies around, it shoots lightning all over the place and causes forest fires. It is therefore disliked."},
	{"id":"643","name":"Reshiram","desc":"When Reshiram's tail flares, the heat energy moves the atmosphere and changes the world's weather."},
	{"id":"644","name":"Zekrom","desc":"Concealing itself in lightning clouds, it flies throughout the Unova region. It creates electricity in its tail."},
	{"id":"645","name":"Landorus","desc":"From the forces of lightning and wind, it creates energy to give nutrients to the soil and make the land abundant."},
	{"id":"646","name":"Kyurem","desc":"It generates a powerful, freezing energy inside itself, but its body became frozen when the energy leaked out."},
	{"id":"647","name":"Keldeo","desc":"When it is resolute, its body fills with power and it becomes swifter. Its jumps are then too fast to follow."},
	{"id":"648","name":"Meloetta","desc":"Its melodies are sung with a special vocalization method that can control the feelings of those who hear it."},
	{"id":"649","name":"Genesect","desc":"This Pokemon existed 300 million years ago. Team Plasma altered it and attached a cannon to its back."},
	{"id":"650","name":"Chespin","desc":"Such a thick shell of wood covers its head and back that even a direct hit from a truck wouldn't faze it."},
	{"id":"651","name":"Quilladin","desc":"They strengthen their lower bodies by running into one another. They are very kind and won't start fights."},
	{"id":"652","name":"Chesnaught","desc":"When it takes a defensive posture with its fists guarding its face, it could withstand a bomb blast."},
	{"id":"653","name":"Fennekin","desc":"As it walks, it munches on a twig in place of a snack. It intimidates opponents by puffing hot air out of its ears."},
	{"id":"654","name":"Braixen","desc":"When the twig is plucked from its tail, friction sets the twig alight. The flame is used to send signals to its allies."},
	{"id":"655","name":"Delphox","desc":"Using psychic power, it generates a fiery vortex of 5,400 degrees Fahrenheit, incinerating foes swept into this whirl of flame."},
	{"id":"656","name":"Froakie","desc":"It protects its skin by covering its body in delicate bubbles. Beneath its happy-go-lucky air, it keeps a watchful eye on its surroundings."},
	{"id":"657","name":"Frogadier","desc":"Its swiftness is unparalleled. It can scale a tower of more than 2,000 feet in a minute's time."},
	{"id":"658","name":"Greninja","desc":"It appears and vanishes with a ninja's grace. It toys with its enemies using swift movements, while slicing them with throwing stars of sharpest water."},
	{"id":"659","name":"Bunnelby","desc":"It has ears like shovels. Digging holes strengthens its ears so much that they can sever thick roots effortlessly."},
	{"id":"660","name":"Diggersby","desc":"As powerful as an excavator, its ears can reduce dense bedrock to rubble. When it's finished digging, it lounges lazily."},
	{"id":"661","name":"Fletchling","desc":"Despite the beauty of its lilting voice, it's merciless to intruders that enter its territory."},
	{"id":"662","name":"Fletchinder","desc":"The hotter the flame sac on its belly, the faster it can fly, but it takes some time to get the fire going."},
	{"id":"663","name":"Talonflame","desc":"When attacking prey, it can reach speeds of up to 310 mph. It finishes its prey off with a colossal kick."},
	{"id":"664","name":"Scatterbug","desc":"The powder that covers its body regulates its temperature, so it can live in any region or climate."},
	{"id":"665","name":"Spewpa","desc":"The beaks of bird Pokemon can't begin to scratch its stalwart body. To defend itself, it spews powder."},
	{"id":"666","name":"Vivillon","desc":"The patterns on this Pokemon's wings depend on the climate and topography of its habitat. It scatters colorful scales."},
	{"id":"667","name":"Litleo","desc":"They set off on their own from their pride and live by themselves to become stronger. These hot-blooded Pokemon are quick to fight."},
	{"id":"668","name":"Pyroar","desc":"With fiery breath of more than 10,000 degrees Fahrenheit, they viciously threaten any challenger. The females protect the pride's cubs."},
	{"id":"669","name":"Flab?b?","desc":"When it finds a flower it likes, it dwells on that flower its whole life long. It floats in the wind's embrace with an untroubled heart."},
	{"id":"670","name":"Floette","desc":"When the flowers of a well-tended flower bed bloom, it appears and celebrates with an elegant dance."},
	{"id":"671","name":"Florges","desc":"In times long past, governors of castles would invite Florges to create flower gardens to embellish the castle domains."},
	{"id":"672","name":"Skiddo","desc":"If it has sunshine and water, it doesn't need to eat, because it can generate energy from the leaves on its back."},
	{"id":"673","name":"Gogoat","desc":"They inhabit mountainous regions. The leader of the herd is decided by a battle of clashing horns."},
	{"id":"674","name":"Pancham","desc":"It does its level best to glare and pull a scary face, but it can't help grinning if anyone pats its head."},
	{"id":"675","name":"Pangoro","desc":"It charges ahead and bashes its opponents like a berserker, uncaring about any hits it might take. Its arms are mighty enough to snap a telephone pole."},
	{"id":"676","name":"Furfrou","desc":"Historically, in the Kalos region, these Pokemon were the designated guardians of the king."},
	{"id":"677","name":"Espurr","desc":"It has enough psychic energy to blast everything within 300 feet of itself, but it has no control over its power."},
	{"id":"678","name":"Meowstic","desc":"The eyeball patterns on the interior of its ears emit psychic energy. It keeps the patterns tightly covered because that power is too immense."},
	{"id":"679","name":"Honedge","desc":"If anyone dares to grab its hilt, it wraps a blue cloth around that person's arm and drains that person's life energy completely."},
	{"id":"680","name":"Doublade","desc":"The complex attack patterns of its two swords are unstoppable, even for an opponent greatly accomplished at swordplay."},
	{"id":"681","name":"Aegislash","desc":"Apparently, it can detect the innate qualities of leadership. According to legend, whoever it recognizes is destined to become king."},
	{"id":"682","name":"Spritzee","desc":"In the past, rather than using perfume, royal ladies carried a Spritzee that would waft a fragrance they liked."},
	{"id":"683","name":"Aromatisse","desc":"Its scent is so overpowering that, unless a Trainer happens to really enjoy the smell, he or she will have a hard time walking alongside it."},
	{"id":"684","name":"Swirlix","desc":"Because it eats nothing but sweets, its fur is as sticky sweet as cotton candy."},
	{"id":"685","name":"Slurpuff","desc":"Its sense of smell is 100 million times better than a human's, so even the faintest scent tells it about everything in the area. It's like it can see with its nose!"},
	{"id":"686","name":"Inkay","desc":"It flashes the light-emitting spots on its body, which drains its opponent's will to fight. It takes the opportunity to scuttle away and hide."},
	{"id":"687","name":"Malamar","desc":"It lures its prey close with hypnotic motions, then wraps its tentacles around it before finishing it off with digestive fluids."},
	{"id":"688","name":"Binacle","desc":"They stretch and then contract, yanking their rocks along with them in bold hops. They eat seaweed that washes up on the shoreline."},
	{"id":"689","name":"Barbaracle","desc":"Barbaracle's legs and hands have minds of their own, and they will move independently. But they usually follow the head's orders."},
	{"id":"690","name":"Skrelp","desc":"It looks just like rotten kelp. It hides from foes while storing up power for its evolution."},
	{"id":"691","name":"Dragalge","desc":"Tales are told of ships that wander into seas where Dragalge live, never to return."},
	{"id":"692","name":"Clauncher","desc":"Through controlled explosions of internal gas, it can expel water like a pistol shot. At close distances, it can shatter rock."},
	{"id":"693","name":"Clawitzer","desc":"By expelling water from the nozzle in the back of its claw, it can move at a speed of 60 knots."},
	{"id":"694","name":"Helioptile","desc":"The frills on either side of its head have cells that generate electricity when exposed to sunlight."},
	{"id":"695","name":"Heliolisk","desc":"It stimulates its muscles with electricity, boosting the strength in its legs and enabling it to run 100 yards in five seconds."},
	{"id":"696","name":"Tyrunt","desc":"Its immense jaws have enough destructive force that it can chew up an automobile. It lived 100 million years ago."},
	{"id":"697","name":"Tyrantrum","desc":"Nothing could stop this Pokemon 100 million years ago, so it behaved like a king."},
	{"id":"698","name":"Amaura","desc":"This calm Pokemon lived in a cold land where there were no violent predators like Tyrantrum."},
	{"id":"699","name":"Aurorus","desc":"Using its diamond-shaped crystals, it can instantly create a wall of ice to block an opponent's attack."},
	{"id":"700","name":"Sylveon","desc":"It wraps its ribbonlike feelers around the arm of its beloved Trainer and walks with him or her."},
	{"id":"701","name":"Hawlucha","desc":"With its wings, it controls its position in the air. It likes to attack from above, a maneuver that is difficult to defend against."},
	{"id":"702","name":"Dedenne","desc":"It uses its tail to absorb electricity from power plants or from outlets in houses, and then it fires the electricity from its whiskers."},
	{"id":"703","name":"Carbink","desc":"It has slept underground for hundreds of millions of years since its birth. It's occasionally found during the excavation of caves."},
	{"id":"704","name":"Goomy","desc":"It's covered in a slimy membrane that makes any punches or kicks slide off it harmlessly."},
	{"id":"705","name":"Sliggoo","desc":"Its four horns are a high-performance radar system. It uses them to sense sounds and smells, rather than using ears or a nose."},
	{"id":"706","name":"Goodra","desc":"It attacks with retractable horns. It throws a punch that's the equivalent of the force of a hundred pro boxers."},
	{"id":"707","name":"Klefki","desc":"It never lets go of a key that it likes, so people give it the keys to vaults and safes as a way to prevent crime."},
	{"id":"708","name":"Phantump","desc":"According to old tales, these Pokemon are stumps possessed by the spirits of children who died while lost in the forest."},
	{"id":"709","name":"Trevenant","desc":"Using its roots as a nervous system, it controls the trees in the forest. It's kind to the Pokemon that reside in its body."},
	{"id":"710","name":"Pumpkaboo","desc":"It is said to carry wandering spirits to the place where they belong so they can move on."},
	{"id":"711","name":"Gourgeist","desc":"It enwraps its prey in its hairlike arms. It sings joyfully as it observes the suffering of its prey."},
	{"id":"712","name":"Bergmite","desc":"Using air of -150 degrees Fahrenheit, they freeze opponents solid. They live in herds above the snow line on mountains."},
	{"id":"713","name":"Avalugg","desc":"The way several Bergmite huddle on its back makes it look like an aircraft carrier made of ice."},
	{"id":"714","name":"Noibat","desc":"Even a robust wrestler will become dizzy and unable to stand when exposed to its 200,000-hertz ultrasonic waves."},
	{"id":"715","name":"Noivern","desc":"The ultrasonic waves it emits from its ears can reduce a large boulder to pebbles. It swoops out of the dark to attack."},
	{"id":"716","name":"Xerneas","desc":"When the horns on its head shine in seven colors, it is said to be sharing everlasting life."},
	{"id":"717","name":"Yveltal","desc":"When its life comes to an end, it absorbs the life energy of every living thing and turns into a cocoon once more."},
	{"id":"718","name":"Zygarde","desc":"It's thought to be monitoring the ecosystem. There are rumors that even greater power lies hidden within it."},
	{"id":"719","name":"Diancie","desc":"It can instantly create many diamonds by compressing the carbon in the air between its hands."},
	{"id":"720","name":"Hoopa","desc":"It is said to be able to seize anything it desires with its six rings and six huge arms. With its power sealed, it is transformed into a much smaller form."},
	{"id":"721","name":"Volcanion","desc":"It expels its internal steam from the arms on its back. It has enough power to blow away a mountain."},
	{"id":"722","name":"Rowlet","desc":"Silently it glides, drawing near its targets. Before they even notice it, it begins to pelt them with vicious kicks."},
	{"id":"723","name":"Dartrix","desc":"It throws sharp feathers called blade quills at enemies or prey. It seldom misses."},
	{"id":"724","name":"Decidueye","desc":"Although basically cool and cautious, when it's caught by surprise, it's seized by panic."},
	{"id":"725","name":"Litten","desc":"It doesn't allow its emotions to be easily seen. Earning its trust takes time. It prefers solitude."},
	{"id":"726","name":"Torracat","desc":"It boasts powerful front legs. With a single punch, it can bend an iron bar right over."},
	{"id":"727","name":"Incineroar","desc":"After hurling ferocious punches and flinging furious kicks, it finishes opponents off by spewing fire from around its navel."},
	{"id":"728","name":"Popplio","desc":"This Pokemon can control water bubbles. It practices diligently so it can learn to make big bubbles."},
	{"id":"729","name":"Brionne","desc":"It cares deeply for its companions. When its Trainer is feeling down, it performs a cheery dance to try and help."},
	{"id":"730","name":"Primarina","desc":"Its singing voice is its chief weapon in battle. This Pokemon's Trainer must prioritize the daily maintenance of its throat at all costs."},
	{"id":"731","name":"Pikipek","desc":"This Pokemon feeds on berries, whose leftover seeds become the ammunition for the attacks it fires off from its mouth."},
	{"id":"732","name":"Trumbeak","desc":"By bending its beak, it can produce a variety of calls and brand itself a noisy nuisance for its neighbors."},
	{"id":"733","name":"Toucannon","desc":"Within its beak, its internal gas ignites, explosively launching seeds with enough power to pulverize boulders."},
	{"id":"734","name":"Yungoos","desc":"It wanders around in a never-ending search for food. At dusk, it collapses from exhaustion and falls asleep on the spot."},
	{"id":"735","name":"Gumshoos","desc":"It adores having Rattata and Raticate for dinner, but as it's diurnal, it never encounters them. This Pokemon boasts incredible patience."},
	{"id":"736","name":"Grubbin","desc":"They often gather near places frequented by electric Pokemon in order to avoid being attacked by bird Pokemon."},
	{"id":"737","name":"Charjabug","desc":"From the food it digests, it generates electricity, and it stores this energy in its electric sac."},
	{"id":"738","name":"Vikavolt","desc":"It produces electricity via an electrical organ in its abdomen. It overwhelms bird Pokemon with shocking beams of electrical energy."},
	{"id":"739","name":"Crabrawler","desc":"It punches so much, its pincers often come off from overuse, but they grow back quickly. What little meat they contain is rich and delicious."},
	{"id":"740","name":"Crabominable","desc":"It just throws punches indiscriminately. In times of desperation, it can lop off its own pincers and fire them like rockets."},
	{"id":"741","name":"Oricorio","desc":"This Oricorio has sipped red nectar. Its passionate dance moves cause its enemies to combust in both body and mind."},
	{"id":"742","name":"Cutiefly","desc":"Myriads of Cutiefly flutter above the heads of people who have auras resembling those of flowers."},
	{"id":"743","name":"Ribombee","desc":"Some of Ribombee's pollen puffs are highly nutritious. They are sometimes sold as supplements."},
	{"id":"744","name":"Rockruff","desc":"This Pokemon has lived with people since times long ago. It can sense when its Trainer is in the dumps and will stick close by its Trainer's side."},
	{"id":"745","name":"Lycanroc","desc":"When properly raised from a young age, it will become a trustworthy partner that will absolutely never betray its Trainer."},
	{"id":"746","name":"Wishiwashi","desc":"It's awfully weak and notably tasty, so everyone is always out to get it. As it happens, anyone trying to bully it receives a painful lesson."},
	{"id":"747","name":"Mareanie","desc":"It's found crawling on beaches and seafloors. The coral that grows on Corsola's head is as good as a five-star banquet to this Pokemon."},
	{"id":"748","name":"Toxapex","desc":"Those attacked by Toxapex's poison will suffer intense pain for three days and three nights. Post-recovery, there will be some aftereffects."},
	{"id":"749","name":"Mudbray","desc":"It has a stubborn, individualistic disposition. Eating dirt, making mud, and playing in the mire all form part of its daily routine."},
	{"id":"750","name":"Mudsdale","desc":"Its heavy, mud-covered kicks are its best means of attack, and it can reduce large trucks to scrap without breaking a sweat."},
	{"id":"751","name":"Dewpider","desc":"When it comes across enemies or potential prey, this Pokemon smashes its water-bubble-covered head into them."},
	{"id":"752","name":"Araquanid","desc":"Despite what its appearance suggests, it cares for others. If it finds vulnerable, weak Pokemon, it protectively brings them into its water bubble."},
	{"id":"753","name":"Fomantis","desc":"They give off a sweet and refreshing scent. Cutiefly often gather near the tall grass where Fomantis are hiding."},
	{"id":"754","name":"Lurantis","desc":"It fires beams from its sickle-shaped petals. These beams are powerful enough to cleave through thick metal plates."},
	{"id":"755","name":"Morelull","desc":"As it drowses the day away, it nourishes itself by sucking from tree roots. It wakens at the fall of night, wandering off in search of a new tree."},
	{"id":"756","name":"Shiinotic","desc":"It emits flickering spores that cause drowsiness. When its prey succumb to sleep, this Pokemon feeds on them by sucking in their energy."},
	{"id":"757","name":"Salandit","desc":"Volcanoes or dry, craggy places are its home. It emanates a sweet-smelling poisonous gas that attracts bug Pokemon, then attacks them."},
	{"id":"758","name":"Salazzle","desc":"Filled with pheromones, its poisonous gas can be diluted to use in the production of luscious perfumes."},
	{"id":"759","name":"Stufful","desc":"A touch from anyone except a known friend sends it into a surging frenzy. It's an incredibly dangerous Pokemon."},
	{"id":"760","name":"Bewear","desc":"This Pokemon has the habit of hugging its companions. Many Trainers have left this world after their spines were squashed by its hug."},
	{"id":"761","name":"Bounsweet","desc":"Although it's too sugary for human consumption, Bounsweet's sweat can be watered down into a juice with just the right amount of sweetness."},
	{"id":"762","name":"Steenee","desc":"This Pokemon is always bouncing around energetically. Other Pokemon are attracted by its lively appearance and pleasant aroma."},
	{"id":"763","name":"Tsareena","desc":"A Pokemon known for the beauty of its well-shaped legs, it sometimes appears as a mascot in advertisements for beauty salons."},
	{"id":"764","name":"Comfey","desc":"Baths prepared with the flowers from its vine have a relaxing effect, so this Pokemon is a hit with many people."},
	{"id":"765","name":"Oranguru","desc":"Deep in the jungle, high in the lofty canopy, this Pokemon abides. On rare occasions, it shows up at the beach to match wits with Slowking."},
	{"id":"766","name":"Passimian","desc":"They battle with hard berries for weapons. Their techniques are passed from the boss to the group, generation upon generation."},
	{"id":"767","name":"Wimpod","desc":"Its habitat varies from beaches to seabeds. A natural scavenger, it will gleefully chow down on anything edible, no matter how rotten."},
	{"id":"768","name":"Golisopod","desc":"It battles skillfully with its six arms, but spends most of its time peacefully meditating in caves deep beneath the sea."},
	{"id":"769","name":"Sandygast","desc":"It takes control of anyone who puts a hand in its mouth. And so it adds to the accumulation of its sand-mound body."},
	{"id":"770","name":"Palossand","desc":"Buried beneath the castle are masses of dried-up bones from those whose vitality it has drained."},
	{"id":"771","name":"Pyukumuku","desc":"These Pokemon line the beaches. The sticky mucous that covers their bodies can be used to soothe sunburned skin. How convenient!"},
	{"id":"772","name":"Type: Null","desc":"Due to the danger that this synthetic Pokemon may go on a rampage, it wears a control mask to restrain its power."},
	{"id":"773","name":"Silvally","desc":"Although its name was Type: Null at first, the boy who evolved it into this form gave it the name by which it is now known."},
	{"id":"774","name":"Minior","desc":"Strong impacts can knock it out of its shell. This Pokemon was born from mutated nanoparticles."},
	{"id":"775","name":"Komala","desc":"The log it holds was given to it by its parents at birth. It has also been known to cling to the arm of a friendly Trainer."},
	{"id":"776","name":"Turtonator","desc":"It gushes fire and poisonous gases from its nostrils. Its dung is an explosive substance and can be put to various uses."},
	{"id":"777","name":"Togedemaru","desc":"The long hairs on its back act as lightning rods. The bolts of lightning it attracts are stored as energy in its electric sac."},
	{"id":"778","name":"Mimikyu","desc":"A lonely Pokemon, it conceals its terrifying appearance beneath an old rag so it can get closer to people and other Pokemon."},
	{"id":"779","name":"Bruxish","desc":"It stuns its prey with psychokinesis and then grinds them to mush with its strong teeth. Even Shellder's shell is no match for it."},
	{"id":"780","name":"Drampa","desc":"This Pokemon is friendly to people and loves children most of all. It comes from deep in the mountains to play with children it likes in town."},
	{"id":"781","name":"Dhelmise","desc":"The soul of seaweed adrift in the waves became reborn as this Pokemon. It maintains itself with new infusions of seabed detritus and seaweed."},
	{"id":"782","name":"Jangmo-o","desc":"They live in mountains where no trace of humans can be detected. Jangmo-o grow little by little as they battle one another."},
	{"id":"783","name":"Hakamo-o","desc":"It sheds and regrows its scales on a continuous basis. The scales become harder and sharper each time they're regrown."},
	{"id":"784","name":"Kommo-o","desc":"Its rigid scales function as offense and defense. In the past, its scales were processed and used to make weapons and other commodities."},
	{"id":"785","name":"Tapu Koko","desc":"It confuses its enemies by flying too quickly for the eye to follow. It has a hair-trigger temper but forgets what made it angry an instant later."},
	{"id":"786","name":"Tapu Lele","desc":"As it flutters about, it scatters its strangely glowing scales. Touching them is said to restore good health on the spot."},
	{"id":"787","name":"Tapu Bulu","desc":"The guardian deity of Ula'ula is a lazy Pokemon. It commands plants to immobilize its foes and then deals them a savage blow with its horns."},
	{"id":"788","name":"Tapu Fini","desc":"The guardian deity of Poni, it can control water. People say it can create pure water that will wash away any uncleanness."},
	{"id":"789","name":"Cosmog","desc":"In ages past, it was called the child of the stars. It's said to be a Pokemon from another world, but no specific details are known."},
	{"id":"790","name":"Cosmoem","desc":"There's something accumulating around the black core within its hard shell. People think this Pokemon may come from another world."},
	{"id":"791","name":"Solgaleo","desc":"This Pokemon is said to be a male evolution of Cosmog. At the activation of its third eye, it departs for another world."},
	{"id":"792","name":"Lunala","desc":"Said to live in another world, this Pokemon devours light, drawing the moonless dark veil of night over the brightness of day."},
	{"id":"793","name":"Nihilego","desc":"One of the Ultra Beasts. It's unclear whether or not this Pokemon is sentient, but sometimes it can be observed behaving like a young girl."},
	{"id":"794","name":"Buzzwole","desc":"A mysterious life-form called an Ultra Beast. Witnesses saw it pulverize a dump truck with a single punch."},
	{"id":"795","name":"Pheromosa","desc":"One of the Ultra Beasts. It refuses to touch anything, perhaps because it senses some uncleanness in this world."},
	{"id":"796","name":"Xurkitree","desc":"It appeared from the Ultra Wormhole. It raided a power plant, so people think it energizes itself with electricity."},
	{"id":"797","name":"Celesteela","desc":"One kind of Ultra Beast. Witnesses have seen it burn down a forest by expelling gas from its two arms."},
	{"id":"798","name":"Kartana","desc":"One of the Ultra Beast life-forms, it was observed cutting down a gigantic steel tower with one stroke of its blade."},
	{"id":"799","name":"Guzzlord","desc":"A dangerous Ultra Beast, it appears to be eating constantly, but for some reason its droppings have never been found."},
	{"id":"800","name":"Necrozma","desc":"Light is apparently the source of its energy. It has an extraordinarily vicious disposition and is constantly firing off laser beams."},
	{"id":"801","name":"Magearna","desc":"Its mechanized body is merely a vessel. Its true self is its Soul-Heart, an artificial soul."},
	{"id":"802","name":"Marshadow","desc":"It sinks into the shadows of people and Pokemon, where it can understand their feelings and copy their capabilities."},
	{"id":"803","name":"Poipole","desc":"An Ultra Beast that lives in a different world, it cackles wildly as it sprays its opponents with poison from the needles on its head."},
	{"id":"804","name":"Naganadel","desc":"One kind of Ultra Beast, it fires a glowing, venomous liquid from its needles. This liquid is also immensely adhesive."},
	{"id":"805","name":"Stakataka","desc":"When stone walls started moving and attacking, the brute's true identity was this mysterious life-form, which brings to mind an Ultra Beast."},
	{"id":"806","name":"Blacephalon","desc":"A UB that appeared from an Ultra Wormhole, it causes explosions, then takes advantage of opponents' surprise to rob them of their vitality."},
	{"id":"807","name":"Zeraora","desc":"It approaches its enemies at the speed of lightning, then tears them limb from limb with its sharp claws."},
	{"id":"808","name":"Meltan","desc":"It melts particles of iron and other metals found in the subsoil, so it can absorb them into its body of molten steel."},
	{"id":"809","name":"Melmetal","desc":"Revered long ago for its capacity to create iron from nothing, for some reason it has come back to life after 3,000 years."},
	{"id":"810","name":"Grookey","desc":"It attacks with rapid beats of its stick. As it strikes with amazing speed, it gets more and more pumped."},
	{"id":"811","name":"Thwackey","desc":"When it's drumming out rapid beats in battle, it gets so caught up in the rhythm that it won't even notice that it's already knocked out its opponent."},
	{"id":"812","name":"Rillaboom","desc":"The one with the best drumming techniques becomes the boss of the troop. It has a gentle disposition and values harmony among its group."},
	{"id":"813","name":"Scorbunny","desc":"It has special pads on the backs of its feet, and one on its nose. Once it's raring to fight, these pads radiate tremendous heat."},
	{"id":"814","name":"Raboot","desc":"It kicks berries right off the branches of trees and then juggles them with its feet, practicing its footwork."},
	{"id":"815","name":"Cinderace","desc":"It's skilled at both offense and defense, and it gets pumped up when cheered on. But if it starts showboating, it could put itself in a tough spot."},
	{"id":"816","name":"Sobble","desc":"When it gets wet, its skin changes color, and this Pokemon becomes invisible as if it were camouflaged."},
	{"id":"817","name":"Drizzile","desc":"Highly intelligent but also very lazy, it keeps enemies out of its territory by laying traps everywhere."},
	{"id":"818","name":"Inteleon","desc":"Its nictitating membranes let it pick out foes' weak points so it can precisely blast them with water that shoots from its fingertips at Mach 3."},
	{"id":"819","name":"Skwovet","desc":"It eats berries nonstop--a habit that has made it more resilient than it looks. It'll show up on farms, searching for yet more berries."},
	{"id":"820","name":"Greedent","desc":"Common throughout the Galar region, this Pokemon has strong teeth and can chew through the toughest of berry shells."},
	{"id":"821","name":"Rookidee","desc":"Jumping nimbly about, this small-bodied Pokemon takes advantage of even the slightest opportunity to disorient larger opponents."},
	{"id":"822","name":"Corvisquire","desc":"The lessons of many harsh battles have taught it how to accurately judge an opponent's strength."},
	{"id":"823","name":"Corviknight","desc":"With their great intellect and flying skills, these Pokemon very successfully act as the Galar region's airborne taxi service."},
	{"id":"824","name":"Blipbug","desc":"Often found in gardens, this Pokemon has hairs on its body that it uses to assess its surroundings."},
	{"id":"825","name":"Dottler","desc":"As it grows inside its shell, it uses its psychic abilities to monitor the outside world and prepare for evolution."},
	{"id":"826","name":"Orbeetle","desc":"It emits psychic energy to observe and study what's around it--and what's around it can include things over six miles away."},
	{"id":"827","name":"Nickit","desc":"Cunning and cautious, this Pokemon survives by stealing food from others. It erases its tracks with swipes of its tail as it makes off with its plunder."},
	{"id":"828","name":"Thievul","desc":"With a lithe body and sharp claws, it goes around stealing food and eggs. Boltund is its natural enemy."},
	{"id":"829","name":"Gossifleur","desc":"It whirls around in the wind while singing a joyous song. This delightful display has charmed many into raising this Pokemon."},
	{"id":"830","name":"Eldegoss","desc":"The cotton on the head of this Pokemon can be spun into a glossy, gorgeous yarn--a Galar regional specialty."},
	{"id":"831","name":"Wooloo","desc":"If its fleece grows too long, Wooloo won't be able to move. Cloth made with the wool of this Pokemon is surprisingly strong."},
	{"id":"832","name":"Dubwool","desc":"Its majestic horns are meant only to impress the opposite gender. They never see use in battle."},
	{"id":"833","name":"Chewtle","desc":"It starts off battles by attacking with its rock-hard horn, but as soon as the opponent flinches, this Pokemon bites down and never lets go."},
	{"id":"834","name":"Drednaw","desc":"This Pokemon rapidly extends its retractable neck to sink its sharp fangs into distant enemies and take them down."},
	{"id":"835","name":"Yamper","desc":"This gluttonous Pokemon only assists people with their work because it wants treats. As it runs, it crackles with electricity."},
	{"id":"836","name":"Boltund","desc":"It sends electricity through its legs to boost their strength. Running at top speed, it easily breaks 50 mph."},
	{"id":"837","name":"Rolycoly","desc":"It can race around like a unicycle, even on rough, rocky terrain. Burning coal sustains it."},
	{"id":"838","name":"Carkol","desc":"By rapidly rolling its legs, it can travel at over 18 mph. The temperature of the flames it breathes exceeds 1,800 degrees Fahrenheit."},
	{"id":"839","name":"Coalossal","desc":"While it's engaged in battle, its mountain of coal will burn bright red, sending off sparks that scorch the surrounding area."},
	{"id":"840","name":"Applin","desc":"As soon as it's born, it burrows into an apple. Not only does the apple serve as its food source, but the flavor of the fruit determines its evolution."},
	{"id":"841","name":"Flapple","desc":"It flies on wings of apple skin and spits a powerful acid. It can also change its shape into that of an apple."},
	{"id":"842","name":"Appletun","desc":"Its body is covered in sweet nectar, and the skin on its back is especially yummy. Children used to have it as a snack."},
	{"id":"843","name":"Silicobra","desc":"It spews sand from its nostrils. While the enemy is blinded, it burrows into the ground to hide."},
	{"id":"844","name":"Sandaconda","desc":"Its unique style of coiling allows it to blast sand out of its sand sac more efficiently."},
	{"id":"845","name":"Cramorant","desc":"This hungry Pokemon swallows Arrokuda whole. Occasionally, it makes a mistake and tries to swallow a Pokemon other than its preferred prey."},
	{"id":"846","name":"Arrokuda","desc":"After it's eaten its fill, its movements become extremely sluggish. That's when Cramorant swallows it up."},
	{"id":"847","name":"Barraskewda","desc":"It spins its tail fins to propel itself, surging forward at speeds of over 100 knots before ramming prey and spearing into them."},
	{"id":"848","name":"Toxel","desc":"It manipulates the chemical makeup of its poison to produce electricity. The voltage is weak, but it can cause a tingling paralysis."},
	{"id":"849","name":"Toxtricity","desc":"It has an electrical organ on its chest. While generating electricity, it fills its surroundings with what sounds like the strumming of a bass guitar."},
	{"id":"850","name":"Sizzlipede","desc":"It wraps prey up with its heated body, cooking them in its coils. Once they're well-done, it will voraciously nibble them down to the last morsel."},
	{"id":"851","name":"Centiskorch","desc":"While its burning body is already dangerous on its own, this excessively hostile Pokemon also has large and very sharp fangs."},
	{"id":"852","name":"Clobbopus","desc":"Its tentacles tear off easily, but it isn't alarmed when that happens--it knows they'll grow back. It's about as smart as a three-year-old."},
	{"id":"853","name":"Grapploct","desc":"Searching for an opponent to test its skills against, it emerges onto land. Once the battle is over, it returns to the sea."},
	{"id":"854","name":"Sinistea","desc":"The teacup in which this Pokemon makes its home is a famous piece of antique tableware. Many forgeries are in circulation."},
	{"id":"855","name":"Polteageist","desc":"Leaving leftover black tea unattended is asking for this Pokemon to come along and pour itself into it, turning the tea into a new Polteageist."},
	{"id":"856","name":"Hatenna","desc":"If this Pokemon senses a strong emotion, it will run away as fast as it can. It prefers areas without people."},
	{"id":"857","name":"Hattrem","desc":"Using the braids on its head, it pummels foes to get them to quiet down. One blow from those braids would knock out a professional boxer."},
	{"id":"858","name":"Hatterene","desc":"If you're too loud around it, you risk being torn apart by the claws on its tentacle. This Pokemon is also known as the Forest Witch."},
	{"id":"859","name":"Impidimp","desc":"It sneaks into people's homes, stealing things and feasting on the negative energy of the frustrated occupants."},
	{"id":"860","name":"Morgrem","desc":"With sly cunning, it tries to lure people into the woods. Some believe it to have the power to make crops grow."},
	{"id":"861","name":"Grimmsnarl","desc":"Its hairs work like muscle fibers. When its hairs unfurl, they latch on to opponents, ensnaring them as tentacles would."},
	{"id":"862","name":"Obstagoon","desc":"It evolved after experiencing numerous fights. While crossing its arms, it lets out a shout that would make any opponent flinch."},
	{"id":"863","name":"Perrserker","desc":"After many battles, it evolved dangerous claws that come together to form daggers when extended."},
	{"id":"864","name":"Cursola","desc":"Be cautious of the ectoplasmic body surrounding its soul. You'll become stiff as stone if you touch it."},
	{"id":"865","name":"Sirfetch'd","desc":"After deflecting attacks with its hard leaf shield, it strikes back with its sharp leek stalk. The leek stalk is both weapon and food."},
	{"id":"866","name":"Mr. Rime","desc":"Its amusing movements make it very popular. It releases its psychic power from the pattern on its belly."},
	{"id":"867","name":"Runerigus","desc":"Never touch its shadowlike body, or you'll be shown the horrific memories behind the picture carved into it."},
	{"id":"868","name":"Milcery","desc":"They say that any patisserie visited by Milcery is guaranteed success and good fortune."},
	{"id":"869","name":"Alcremie","desc":"When Alcremie is content, the cream it secretes from its hands becomes sweeter and richer."},
	{"id":"870","name":"Falinks","desc":"The six of them work together as one Pokemon. Teamwork is also their battle strategy, and they constantly change their formation as they fight."},
	{"id":"871","name":"Pincurchin","desc":"It stores electricity in each spine. Even if one gets broken off, it still continues to emit electricity for at least three hours."},
	{"id":"872","name":"Snom","desc":"It eats snow that piles up on the ground. The more snow it eats, the bigger and more impressive the spikes on its back grow."},
	{"id":"873","name":"Frosmoth","desc":"It shows no mercy to any who desecrate fields and mountains. It will fly around on its icy wings, causing a blizzard to chase offenders away."},
	{"id":"874","name":"Stonjourner","desc":"Once a year, on a specific date and at a specific time, they gather out of nowhere and form up in a circle."},
	{"id":"875","name":"Eiscue","desc":"This Pokemon keeps its heat-sensitive head cool with ice. It fishes for its food, dangling its single hair into the sea to lure in prey."},
	{"id":"876","name":"Indeedee","desc":"They diligently serve people and Pokemon so they can gather feelings of gratitude. The females are particularly good at babysitting."},
	{"id":"877","name":"Morpeko","desc":"It carries electrically roasted seeds with it as if they're precious treasures. No matter how much it eats, it always gets hungry again in short order."},
	{"id":"878","name":"Cufant","desc":"If a job requires serious strength, this Pokemon will excel at it. Its copper body tarnishes in the rain, turning a vibrant green color."},
	{"id":"879","name":"Copperajah","desc":"These Pokemon live in herds. Their trunks have incredible grip strength, strong enough to crush giant rocks into powder."},
	{"id":"880","name":"Dracozolt","desc":"The powerful muscles in its tail generate its electricity. Compared to its lower body, its upper half is entirely too small."},
	{"id":"881","name":"Arctozolt","desc":"This Pokemon lived on prehistoric seashores and was able to preserve food with the ice on its body. It went extinct because it moved so slowly."},
	{"id":"882","name":"Dracovish","desc":"Its mighty legs are capable of running at speeds exceeding 40 mph, but this Pokemon can't breathe unless it's underwater."},
	{"id":"883","name":"Arctovish","desc":"The skin on its face is impervious to attack, but breathing difficulties made this Pokemon go extinct anyway."},
	{"id":"884","name":"Duraludon","desc":"The special metal that composes its body is very light, so this Pokemon has considerable agility. It lives in caves because it dislikes the rain."},
	{"id":"885","name":"Dreepy","desc":"If this weak Pokemon is by itself, a mere child could defeat it. But if Dreepy has friends to help it train, it can evolve and become much stronger."},
	{"id":"886","name":"Drakloak","desc":"Without a Dreepy to place on its head and care for, it gets so uneasy it'll try to substitute any Pokemon it finds for the missing Dreepy."},
	{"id":"887","name":"Dragapult","desc":"Apparently the Dreepy inside Dragapult's horns eagerly look forward to being launched out at Mach speeds."},
	{"id":"888","name":"Zacian","desc":"This Pokemon has slumbered for many years. Some say it's Zamazenta's elder sister--others say the two Pokemon are rivals."},
	{"id":"889","name":"Zamazenta","desc":"This Pokemon slept for aeons while in the form of a statue. It was asleep for so long, people forgot that it ever existed."},
	{"id":"890","name":"Eternatus","desc":"It was inside a meteorite that fell 20,000 years ago. There seems to be a connection between this Pokemon and the Dynamax phenomenon."}
];



const attributes    = {used:[]};

const supportsDisplay = function(handlerInput) {
  var hasDisplay =
    handlerInput.requestEnvelope.context &&
    handlerInput.requestEnvelope.context.System &&
    handlerInput.requestEnvelope.context.System.device &&
    handlerInput.requestEnvelope.context.System.device.supportedInterfaces &&
    handlerInput.requestEnvelope.context.System.device.supportedInterfaces.Display

  //console.log("Supported Interfaces are" + JSON.stringify(handlerInput.requestEnvelope.context.System.device.supportedInterfaces));
  return hasDisplay;
}

const replayPokemon = function(handlerInput) {

    var speakOutput = "";
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    
    // if game state is still in configuration mode, we need to re-prompt user to select easy or hard.
    if (sessionAttributes.game_state === 'configure'){
        return handlerInput.responseBuilder
            .speak("Please say easy <break time='150ms'/> or hard <break time='150ms'/> to get started.")
            .reprompt("Please say easy <break time='150ms'/> or hard <break time='150ms'/> to get started.")
            .getResponse();
    } else {
        
        // recreate poke 
        var poke  = {
            id: sessionAttributes.poke_id,
            name: sessionAttributes.poke_name,
            desc: sessionAttributes.poke_desc
        };
        
        var re = new RegExp(poke.name, 'g');
        speakOutput += poke.desc.replace(re,'This Pokemon')+" Who's that Pokemon?";
        
        
        if (supportsDisplay(handlerInput)){
        
            return handlerInput.responseBuilder.addRenderTemplateDirective({
                "type": "BodyTemplate7",
                "token": "SampleTemplate_3476",
                "backButton": "hidden",
                "title": "Who's That Pokemon?",
                "backgroundImage": {
                    "contentDescription": "Blue Background",
                    "sources": [
                        {
                            "url": "https://mttl-tech.s3.amazonaws.com/whos-that-pokemon/images/bg.png"
                        }
                    ]
                },
                "image": {
                    "contentDescription": "Pokemon Silhouette",
                    "sources": [
                        {
                            "url": "https://mttl-tech.s3.amazonaws.com/whos-that-pokemon/images/silhouette/"+poke.id+".png"
                        }
                    ]
                }
            })
            .speak(speakOutput)
            .reprompt('You can ask for a hint, or say stop to quit.')
            .getResponse();
            
        } else {
            
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt(speakOutput)
                .getResponse();
            
        }
    }
}

const showCorrectPoke = function(handlerInput, skip_prev)
{
    
    skip_prev = (typeof skip_prev !== 'undefined') ?  skip_prev : false;

    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

    /*
    // if we are still in the configure game state, then lets just assume they selected hard and continue 
    if (sessionAttributes.game_state === 'configure'){
        return EasyHardIntentHandler(handlerInput);
    }
    */
    
    var correct = false;
    const correct_answer = 'The correct answer was '+sessionAttributes.poke_name+'.';
    const guess_again = "<break time='300ms'/> Would you like to guess another Pokemon?";
    var speakOutput = correct_answer;
    
    if ( ! skip_prev){
        
        const pokemon   = handlerInput.requestEnvelope.request.intent.slots.pokemon;
        const pkmn_val  = pokemon.resolutions.resolutionsPerAuthority[0].values[0].value;
        const pkmn_id   = pkmn_val.id.replace('PKMN_','');
        const pkmn_name = pkmn_val.name;
        
        // determine if guess is correct
        correct = (pkmn_id === sessionAttributes.poke_id);
        
        speakOutput = (correct ? '<audio src="https://mttl-tech.s3.amazonaws.com/whos-that-pokemon/audio/m2-victory-vs-trainer.mp3"/> '+pkmn_name+' is Correct!' : '<audio src="https://mttl-tech.s3.amazonaws.com/whos-that-pokemon/audio/m2-Low_Health.mp3"/> '+pkmn_name+' is Incorrect. ' + correct_answer); 
        
    }

    
    speakOutput += guess_again;
    
    if (supportsDisplay(handlerInput)){
    
        return handlerInput.responseBuilder.addRenderTemplateDirective({
            "type": "BodyTemplate7",
            "token": "SampleTemplate_3476",
            "backButton": "hidden",
            "title": "Who's That Pokemon?",
                "backgroundImage": {
                "contentDescription": "Blue Background",
                "sources": [
                    {
                        "url": "https://mttl-tech.s3.amazonaws.com/whos-that-pokemon/images/bg-"+(correct? 'yellow' : 'red')+".png"
                        //"url": "https://mttl-tech.s3.amazonaws.com/whos-that-pokemon/images/bg.png"
                    }
                ]
            },
            "image": {
                "contentDescription": "Pokemon Silhouette",
                "sources": [
                    {
                        "url": "https://mttl-tech.s3.amazonaws.com/whos-that-pokemon/images/actual/"+sessionAttributes.poke_id+".png"
                    }
                ]
            }
        })
        .speak(speakOutput)
        .reprompt(correct_answer + " " + guess_again)
        .getResponse();
        
    } else {
    
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(correct_answer + " " + guess_again)
            .getResponse();
        
    }
    
}

const setRandoPoke = function(handlerInput){
    
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    
    var current_pokes = all_pokemon;
    
    if (sessionAttributes.game_mode === 'easy'){
        current_pokes = current_pokes.slice(0,149); // lowering this -2 until Nidoran is fixed
    }
    
    var speakOutput = "";
    var poke = current_pokes[Math.floor(Math.random() * current_pokes.length)];
    
    // no poke_id means the game just started - this is the first randoPoke
    if ( ! sessionAttributes.is_initialized){
        
        var prefix = (sessionAttributes.game_mode === 'easy' ? 'the ' : '');
        var suffix = (sessionAttributes.game_mode === 'easy' ? ' original' : '');
        
        speakOutput = "Great, you've selected "+sessionAttributes.game_mode+" mode <break time='300ms'/> which will include " + prefix + (current_pokes.length + 2) + suffix + " Pokemon. <break time='300ms'/> Let's get started. <break time='1s'/>";
        
    }
    
    sessionAttributes.poke_id = poke.id;
    sessionAttributes.poke_name = poke.name;
    sessionAttributes.poke_desc = poke.desc;
    sessionAttributes.is_initialized = true;
    handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
    
    var re = new RegExp(poke.name, 'g');
    speakOutput += poke.desc.replace(re,'This Pokemon')+" Who's that Pokemon?";
    
    if (supportsDisplay(handlerInput)){
    
        return handlerInput.responseBuilder.addRenderTemplateDirective({
            "type": "BodyTemplate7",
            "token": "SampleTemplate_3476",
            "backButton": "hidden",
            "title": "Who's That Pokemon?",
            "backgroundImage": {
                "contentDescription": "Blue Background",
                "sources": [
                    {
                        "url": "https://mttl-tech.s3.amazonaws.com/whos-that-pokemon/images/bg-blue.png"
                        //"url": "https://mttl-tech.s3.amazonaws.com/whos-that-pokemon/images/bg.png"
                    }
                ]
            },
            "image": {
                "contentDescription": "Pokemon Silhouette",
                "sources": [
                    {
                        "url": "https://mttl-tech.s3.amazonaws.com/whos-that-pokemon/images/silhouette/"+poke.id+".png"
                    }
                ]
            }
        })
        .speak(speakOutput)
        .reprompt('Would you like a hint? You can ask for the Pokemon\'s type or to hear what it sounds like.')
        .getResponse();
        
    } else {
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
        
    }
    
};


const LaunchRequestHandler = {
    
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        
        // add game_state so that we can track which state the user is in 
        // this is important, for example: if we launch the intro music but a user automatically says a Pokemon name 
            // we can now add checks to setRandoPoke (and other Intents) to ensure the users is in the proper game_state before continuing
        sessionAttributes.game_state = 'configure';
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
        
        sessionAttributes.poke_id = "001";
        sessionAttributes.poke_name = "Bulbasaur";
        sessionAttributes.is_initialized = false;
        
        var speakOutput = "<audio src='https://mttl-tech.s3.amazonaws.com/whos-that-pokemon/audio/m2-opening-theme.mp3'/> <break time='0.5s'/> Welcome to the World of Pokemon. <break time='300ms'/> I'm Professor Alexa. <break time='300ms'/>";
        speakOutput += "Please say easy <break time='150ms'/> or hard <break time='150ms'/> to get started.";   // I wanted to keep this simple and straight to the point 
        
        if (supportsDisplay(handlerInput)){
        
            return handlerInput.responseBuilder.addRenderTemplateDirective({
                "type": "BodyTemplate7",
                "token": "SampleTemplate_3476",
                "backButton": "hidden",
                "title": "Who's That Pokemon?",
                    "backgroundImage": {
                    "contentDescription": "Blue Background",
                    "sources": [
                        {
                            "url": "https://mttl-tech.s3.amazonaws.com/whos-that-pokemon/images/bg-blue.png"
                            //"url": "https://mttl-tech.s3.amazonaws.com/whos-that-pokemon/images/bg.png"
                        }
                    ]
                },
                "image": {
                    "contentDescription": "Welcome!",
                    "sources": [
                        {
                            "url": "https://mttl-tech.s3.amazonaws.com/whos-that-pokemon/images/welcome-bigger.png"
                            //"url": "https://mttl-tech.s3.amazonaws.com/whos-that-pokemon/images/welcome.png"
                        }
                    ]
                }
            })
            .speak(speakOutput)
                .reprompt("Please say easy <break time='150ms'/> or hard <break time='150ms'/> to get started.")
                .getResponse();
                
        } else {
        
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt("Please say easy <break time='150ms'/> or hard <break time='150ms'/> to get started.")
                .getResponse();
            
        }
    }
};

const RepeatIntentHandler = {

    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'RepeatIntent';
    },
    handle(handlerInput) {
        return replayPokemon(handlerInput);
        
    }
};

const StartIntentHandler = {

    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'StartIntent';
    },
    handle(handlerInput) {
        
        return setRandoPoke(handlerInput);
        
    }
};

const DunnoIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'DunnoIntent');
    },
    handle(handlerInput) {
        
        // read off answer to last shown pokemon - then show next pokemon 
        
        //return setRandoPoke(handlerInput);
        
        return showCorrectPoke(handlerInput, true);
    }
};

const SkipIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'SkipIntent'
            || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.NextIntent');
    },
    handle(handlerInput) {
        
        // read off answer to last shown pokemon - then show next pokemon 
        
        return setRandoPoke(handlerInput);
        
    }
};

const EasyHardIntentHandler = {

    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'EasyHardIntent';
    },
    handle(handlerInput) {
        
        // grab random pokemon
        
        const eh = handlerInput.requestEnvelope.request.intent.slots.easyhard.resolutions.resolutionsPerAuthority[0].values[0].value.name;
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        
        /*
        // if game state is already 'playing', then the user shouldn't be saying easy or hard 
        // let's replay last poke 
        if (sessionAttributes.game_state === 'playing'){
            return replayPokemon(handlerInput);
        }
        */
        
        // update game_state 
        sessionAttributes.game_state = 'playing';
        
        var gmode = 'hard';
        
        if (eh === 'easy' || eh === 'easy mode'){
            
            gmode = 'easy';
            
        }
        
        sessionAttributes.game_mode = gmode;
        
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
        
        return setRandoPoke(handlerInput);
    }
};

const HintIntentHandler = {

    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HintIntent';
    },
    handle(handlerInput) {
        
        var hint = handlerInput.requestEnvelope.request.intent.slots.hints.resolutions.resolutionsPerAuthority[0].values[0].value.name;
        
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        
        var typekey = 'PKMN'+sessionAttributes.poke_id;
        
        var speakOutput = 'This Pokemon is '+pokemon_types[typekey].join(' ')+' type. Who\'s that Pokemon?';
        
        if (hint !== 'cry' && hint !== 'type'){
            
            hint = ( (Math.round(Math.random())) ? 'cry' : 'type');
        }
        
        if (hint === 'cry'){
            
            speakOutput = 'The pokemon sounds like this: <audio src="https://mttl-tech.s3.amazonaws.com/whos-that-pokemon/audio/cries/'+sessionAttributes.poke_id+'.mp3"/> Who\'s that Pokemon?';
        }
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt("You can ask for another hint<break time='300ms'/>, say `Pokedex` to hear its description, <break time='300ms'/> or skip to move on to the next Pokemon.")
            .getResponse();
    }
};

const YesNoIntentHandler = {

    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'YesNoIntent';
    },
    handle(handlerInput) {
        
        const yn = handlerInput.requestEnvelope.request.intent.slots.yesno.resolutions.resolutionsPerAuthority[0].values[0].value.name;
        
        if (yn === 'no'){
            
            const speakOutput = "Please say `stop` to quit playing <break time='300ms'/> or say `next` to move on to the next Pokemon.";
            return handlerInput.responseBuilder
                //.withShouldEndSession(true)
                .speak(speakOutput)
                .reprompt(speakOutput)
                .getResponse();
            
        }
        
        return setRandoPoke(handlerInput);
    }
};


const PokemonIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'PokemonIntent';
    },
    handle(handlerInput) {
        
        return showCorrectPoke(handlerInput);
            
    }
};


const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = "You can say repeat, <break time='300ms'/>ask for a hint, <break time='300ms'/> or say stop to quit.";

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Thank you for playing!  If you enjoyed our skill, please give it a 5 star rating.';
        return handlerInput.responseBuilder
            .withShouldEndSession(true)
            .speak(speakOutput)
            .getResponse();
    }
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = "Sorry, I don't recognize that Pokemon. Please try again. <break time='300ms'/> You can ask me to repeat <break time='300ms'/>, say skip to move on to the next Pokemon <break time='300ms'/>, or ask for a hint.";

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.stack}`);
        //const speakOutput = `Sorry, I had trouble doing what you asked. Please try again.`;
        
        const speakOutput = "Sorry, I don't recognize that Pokemon. Please try again. <break time='300ms'/> You can ask me to repeat the description <break time='300ms'/>, say skip to move on to the next Pokemon <break time='300ms'/>, or ask for a hint.";

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// The SkillBuilder acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        StartIntentHandler,
        YesNoIntentHandler,
        PokemonIntentHandler,
        HintIntentHandler,
        EasyHardIntentHandler,
        DunnoIntentHandler,
        SkipIntentHandler,
        RepeatIntentHandler,
        //HelloWorldIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler, // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    )
    .addErrorHandlers(
        ErrorHandler,
    )
    .lambda();

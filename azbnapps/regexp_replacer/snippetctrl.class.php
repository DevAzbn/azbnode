<?
// CMS Azbn.ru Публичная версия

class SnippetCtrl
{
public $class_name = 'snippetctrl';
public $FE = null;

public $cfg = array(
	'label' => 'snp',
	'storage'=>'/download/azbn.ru/pagebuilder/',
	'tbl' => array(
		'item'=>'pb_snip',
		'cat'=>'pb_snipcat',
	),
);

public $sniproot = null;
public $snippets = array();

	function __construct()
	{
		
	}
	
	public function root()
	{
		return $this->sniproot;
	}
	
	public function setConfig($cfg = array())
	{
		if(count($cfg)) {
			$this->cfg = $cfg;
		}
	}
	
	public function codeByStorage($file,$base='.')
	{
		$from = $base.$this->cfg['storage'].$file;
		if(file_exists($from)) {
			return file_get_contents($from);
		} else {
			return '';
		}
	}
	
	public function codeToStorage($file,$str,$base='.')
	{
		$this->FE->w2f($base.$this->cfg['storage'].$file,$str);
	}
	
	public function rootById($id)
	{
		$this->sniproot = new stdClass();
		$snp = $this->FE->DB->dbSelectFirstRow("SELECT * FROM `".$this->cfg['tbl']['item']."` WHERE (id='$id')");
		if($snp['id']) {
			$this->sniproot->id = $this->FE->as_int($snp['id']);
			$this->sniproot->html = $this->parseHTML($this->codeByStorage('html/'.$snp['id'].'.html'));
			$this->sniproot->css[] = $this->codeByStorage('css/'.$snp['id'].'.css');
			$this->sniproot->js[] = $this->codeByStorage('js/'.$snp['id'].'.js');
			$this->sniproot->is_page = $this->FE->as_int($snp['is_page']);
			$this->sniproot->title = $snp['title'];
			$this->sniproot->class = $snp['class'];
		} else {
			
		}
	}
	
	public function rootByStr($str)
	{
		$this->sniproot = new stdClass();
		$this->sniproot->id = 0;
		$this->sniproot->html = $this->parseHTML($str);
		$this->sniproot->css = array();
		$this->sniproot->js[] = array();
		$this->sniproot->is_page = 0;
		$this->sniproot->title = '';
		$this->sniproot->class = '';
	}
	
	public function parseHTML($str)
	{
		return preg_replace_callback("/\[".$this->cfg['label']."(\d{1,}) ([^\]]*)\]/isu", array(&$this,'makeSnippet'), $str);
	}
	
	public function makeSnippet($str)
	{
		$id = $str[1];
		
		if(isset($this->snippets[$id])) {
			$snp = $this->snippets[$id];
		} else {
			$snp=$this->FE->DB->dbSelectFirstRow("SELECT * FROM `".$this->cfg['tbl']['item']."` WHERE (id='$id')");
		}
		
		if($snp['id']) {
			
			$_param = $this->getSnippetParams($str[2]);
			$_param['{class}'] = $snp['class'].' '.$_param['{class}'];
			$snp['html'] = strtr($this->codeByStorage('html/'.$snp['id'].'.html'),$_param);
			
			$this->snippets[$snp['id']] = $snp;
			
			return $this->parseHTML($snp['html']);
		} else {
			return '';
		}
	}
	
	public function getSnippetParams($str)
	{
		preg_match_all(
			"/(\w+)=\"([^\"]*)\"/isu",
			$str,
			$res,
			PREG_SET_ORDER//PREG_PATTERN_ORDER
			);
		$arr = array();
		if(count($res)) {
			foreach($res as $p) {
				$arr['{'.$p[1].'}']=$p[2];
			}
		}
		return $arr;
	}
	/*
	public function export(&$param)
	{
		$param['item_list']['snips'] = $this->FE->DB->dbSelect("SELECT * FROM `".$this->cfg['tbl']['item']."` WHERE 1");
		while($row = mysql_fetch_array($param['item_list']['snips'])) {
			echo $row['id'];
			$this->codeToStorage('html/'.$row['id'].'.html',$row['html']);
			$this->codeToStorage('css/'.$row['id'].'.css',$row['css']);
			$this->codeToStorage('js/'.$row['id'].'.js',$row['js']);
		}
	}
	*/
}

?>
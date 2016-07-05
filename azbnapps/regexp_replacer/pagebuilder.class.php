<?
// CMS Azbn.ru Публичная версия

class Pagebuilder
{
public $class_name='pagebuilder';

	function __construct()
	{

		}
	
	public function index(&$param)
	{
		//$param['page_html']['seo']=$this->FE->CMS->getSEO(2);
		$this->FE->load(array('path'=>$this->FE->config['app_path'],'class'=>'SnippetCtrl','var'=>'SnpCtrl'));
		
		$param['item_list']['cat'] = $this->FE->DB->dbSelect("SELECT * FROM `".$this->FE->SnpCtrl->cfg['tbl']['cat']."` WHERE (profile='0' OR profile='".$_SESSION['profile']['id']."')");
		$param['item_list']['snips'] = $this->FE->DB->dbSelect("SELECT * FROM `".$this->FE->SnpCtrl->cfg['tbl']['item']."` WHERE (1 AND (profile='0' OR profile='".$_SESSION['profile']['id']."'))");
		
		$this->FE->load(array('path'=>$this->FE->config['app_path'],'class'=>'Viewer','var'=>'Viewer'));
		$this->FE->Viewer->startofpage($param,$this->class_name.'/startofpage');
		$this->FE->Viewer->form($this->class_name.'/index',$param);
		$this->FE->Viewer->endofpage($param,$this->class_name.'/endofpage');
	}
	
	public function viewsnippet(&$param)
	{
		$this->FE->load(array('path'=>$this->FE->config['app_path'],'class'=>'SnippetCtrl','var'=>'SnpCtrl'));
		$this->FE->SnpCtrl->rootById($this->FE->as_int($param['req_arr']['param_1']));
		
		if($this->FE->SnpCtrl->root()->is_page == 0) {
			if(count($this->FE->SnpCtrl->root()->css)) {
				echo "<style>\n\n";
				foreach($this->FE->SnpCtrl->root()->css as $css) {
					echo $css."\n\n";
				}
				echo "</style>\n\n";
			}
			if(count($this->FE->SnpCtrl->root()->js)) {
				echo "<script>\n\n";
				foreach($this->FE->SnpCtrl->root()->js as $js) {
					echo $js."\n\n";
				}
				echo "</script>\n\n";
			}
		}
		
		echo ($this->FE->SnpCtrl->root()->html);
		
	}
	
	public function getsource(&$param)
	{
		$this->FE->load(array('path'=>$this->FE->config['app_path'],'class'=>'SnippetCtrl','var'=>'SnpCtrl'));
		
		$id = $this->FE->as_int($param['req_arr']['param_1']);
		$snip = $this->FE->DB->dbSelectFirstRow("SELECT * FROM `".$this->FE->SnpCtrl->cfg['tbl']['item']."` WHERE (id='$id')");
		$type = $this->FE->_get('type');
		switch($type){
			
			case 'title':{
				echo base64_encode($snip['title']);
			}
			break;
			
			case 'class':{
				echo base64_encode($snip['class']);
			}
			break;
			
			case 'html':{
				echo base64_encode($this->FE->SnpCtrl->codeByStorage('html/'.$snip['id'].'.html'));
			}
			break;
			
			case 'css':{
				echo base64_encode($this->FE->SnpCtrl->codeByStorage('css/'.$snip['id'].'.css'));
			}
			break;
			
			case 'js':{
				echo base64_encode($this->FE->SnpCtrl->codeByStorage('js/'.$snip['id'].'.js'));
			}
			break;
			
			case 'is_page':{
				echo base64_encode($this->FE->as_int($snip['is_page']));
			}
			break;
			
			default:{
				
			}
			break;
			
		}
		
	}
	
	public function createsnippet(&$param) {
		$this->FE->load(array('path'=>$this->FE->config['app_path'],'class'=>'SnippetCtrl','var'=>'SnpCtrl'));
		
		$id = $this->FE->as_int($_POST['id']);
		$snip = array(
			//'id'=>$this->FE->as_int($_POST['id']),
			'cat'=>$this->FE->as_int($_POST['cat']),
			'parent'=>$this->FE->as_int($_POST['parent']),
			'profile'=>$_SESSION['profile']['id'],
			'is_page'=>$this->FE->as_int($_POST['is_page']),
			'title'=>$this->FE->_post('title'),
			'class'=>$this->FE->_post('class'),
			'html'=>'',//$_POST['html'],
			'css'=>'',//$_POST['css'],
			'js'=>'',//$_POST['js'],
		);
		$saveit = $this->FE->as_int($_POST['saveit']);
		if($saveit) {
			if($id) {
				$this->FE->DB->dbUpdateArr($this->FE->SnpCtrl->cfg['tbl']['item'],$snip,"WHERE id='$id'");
				$snip['id'] = $id;
			} else {
				$snip['id'] = $this->FE->DB->dbInsert($this->FE->SnpCtrl->cfg['tbl']['item'],$snip);
			}
			
			$this->FE->SnpCtrl->codeToStorage('html/'.$snip['id'].'.html',$_POST['html']);
			$this->FE->SnpCtrl->codeToStorage('css/'.$snip['id'].'.css',$_POST['css']);
			$this->FE->SnpCtrl->codeToStorage('js/'.$snip['id'].'.js',$_POST['js']);
			
			$this->FE->go2('/'.$this->class_name.'/viewsnippet/'.$snip['id']);
		} else {
			
			$this->FE->SnpCtrl->rootByStr($_POST['html']);
			$this->FE->SnpCtrl->root()->css[] = $_POST['css'];
			$this->FE->SnpCtrl->root()->js[] = $_POST['js'];
			$this->FE->SnpCtrl->root()->is_page = $snip['is_page'];
			
			if($this->FE->SnpCtrl->root()->is_page == 0) {
				if(count($this->FE->SnpCtrl->root()->css)) {
					echo "<style>";
					foreach($this->FE->SnpCtrl->root()->css as $css) {
						echo $css."\n\n";
					}
					echo "</style>\n\n";
				}
				if(count($this->FE->SnpCtrl->root()->js)) {
					echo "<script>";
					foreach($this->FE->SnpCtrl->root()->js as $js) {
						echo $js."\n\n";
					}
					echo "</script>\n\n";
				}
			}
			
			echo ($this->FE->SnpCtrl->root()->html);
		}
	}
	
	public function item(&$param)
	{
		$this->FE->load(array('path'=>$this->FE->config['app_path'],'class'=>'SnippetCtrl','var'=>'SnpCtrl'));
		$this->FE->SnpCtrl->rootById($this->FE->as_int($param['req_arr']['param_1']));
		echo ($this->FE->SnpCtrl->root()->html);
	}
	
}

?>
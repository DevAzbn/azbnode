<?
// CMS Azbn.ru Публичная версия

?>
	
	<div class="full-height grid grid-12 main-content " >
		
		<div class="grid-row full-height pos rel" >
			
			<div class="full-height clmn-xs-12 clmn-sm-12 clmn-md-4 clmn-lg-3 menu animated bounceInDown long3x " >
				<ul class="menu-list" >
					
					<!--<li class="menu-item animated tada long5x " ><a class="nowrap not-go " href="#ineedyourtoken" >Вход ВКонтакте</a></li>-->
					<li class="menu-item animated tada long5x " ><a class="nowrap not-go " href="#statistics" >Статистика сервиса</a></li>
					<li class="menu-item animated tada long5x " ><a class="nowrap not-go " href="#iamveryfriendly" >Добавление в друзья</a></li>
					<li class="menu-item animated tada long5x " ><a class="nowrap " href="/" >На главную</a></li>
					
				</ul>
				
				
				
			</div>
			
			
			
			<div class="full-height clmn-xs-12 clmn-sm-12 clmn-md-8 clmn-lg-9 content pos rel animated bounceInDown long2x" >
				
				<!--
				<div id="ineedyourtoken" class="item-block " >
					
					<a class="menu-btn not-md not-lg iconic ui-btn list" href="#menu" data-title="Вход ВКонтакте" ></a>
					
					<div class="allmargin grid grid-12" >
						
						<div class="grid-row " >
							
							<div class="clmn-xs-12 clmn-sm-12 clmn-md-12 clmn-lg-12 " >
								
								<div class="textable txt shad " >
								
									<p>Для работы с сервисами на данной странице необходимо пройти идентификацию. Для этого перейдите по ссылке ниже, дайте разрешение приложению, а потом скопируйте URL страницы, куда вас перенаправит, не смотря на предупреждения ВКонтакте.</p>
									<p><b>Данный URL необходим для получения максимальных прав при взаимодействии с API!</b></p>
									<p>&nbsp;</p>
									<p><a class="btn big-btn" href="https://oauth.vk.com/authorize?client_id=5172708&display=popup&redirect_uri=https://api.vk.com/blank.html&scope=friends,photos,audio,video,docs,pages,status,wall,groups,messages,email,notifications,stats,ads,offline&response_type=token&v=5.40&revoke=1" target="_blank" >войти</a></p>
									
								</div>
								
							</div>
							
							<div class="clear" ></div>
							
						</div>
					</div>
					
				</div>
				-->
				
				
				<div id="statistics" class="item-block " >
					
					<a class="menu-btn not-md not-lg iconic ui-btn list" href="#menu" data-title="Статистика" ></a>
					
					<div class="allmargin grid grid-12" >
						
						<div class="grid-row " >
							
							<div class="clmn-xs-12 clmn-sm-12 clmn-md-12 clmn-lg-12 " >
								
								<?
								if($_SESSION['profile']['id']) {
								
								$param['addvkfr_list'] = $this->FE->DB->dbSelect("SELECT `nodejs_vk_userinfo`.* FROM `nodejs_vk_userinfo`, `nodejs_vk_addvkfr`, `nodejs_vk_token` WHERE (`nodejs_vk_token`.profile='{$_SESSION['profile']['id']}' AND `nodejs_vk_token`.app_id = '1' AND `nodejs_vk_token`.user_id = `nodejs_vk_addvkfr`.user_id AND `nodejs_vk_token`.user_id = `nodejs_vk_userinfo`.user_id) ORDER BY `nodejs_vk_userinfo`.user_id");
								
								?>
								
								<div class="textable txt shad " >
									<h4>Привязанные к системе аккаунты</h4>
									<?
									$str = '';
									$str_arr = array();
									
									if(mysql_num_rows($param['addvkfr_list'])) {
										?>
										<div class="adaptive-block grid grid-12 flex" >
											<div class="grid-row" >
										<?
										while($row=mysql_fetch_array($param['addvkfr_list'])) {
											$row['p'] = json_decode($row['p'], true);
											
											/*
											["photo_100"]=>
  string(57) "https://pp.vk.me/c629420/v629420436/2bbc1/pe--mfg5JVQ.jpg"
  ["photo_200"]=>
  string(57) "https://pp.vk.me/c629420/v629420436/2bbc0/Wy9-FqB8T1I.jpg"
  ["photo_max"]=>
  string(57) "https://pp.vk.me/c629420/v629420436/2bbc0/Wy9-FqB8T1I.jpg"
  ["photo_200_orig"]=>
  string(57) "https://pp.vk.me/c629420/v629420436/2bbbe/MEPuTxQeAI8.jpg"
  ["photo_400_orig"]=>
  string(57) "https://pp.vk.me/c629420/v629420436/2bbbf/mDCCCZ7BvbQ.jpg"
  ["photo_max_orig"]=>
  string(57) "https://pp.vk.me/c629420/v629420436/2bbbf/mDCCCZ7BvbQ.jpg"

											*/
											
											?>
												
												<a href="#<?=$row['user_id'];?>" class="clmn-2 clmn-xs-4 clmn-sm-3 clmn-md-3 clmn-lg-2 f-box" >
													<img class="image resp margin-center" src="<?=$row['p']['photo_200'];?>" />
													<h4 class="align-center" ><?=($row['p']['first_name'].' '.$row['p']['last_name']);?></h4>
												</a>
												
											<?
										}
										?>
											</div>
										</div>
										<?
										mysql_data_seek($param['addvkfr_list'],0);
									}
									
									
									?>
								</div>
								
								<?
								} else {
									
								$_gd = getdate();
								$today = mktime(0, 0, 0, $_gd['mon'], $_gd['mday'], $_gd['year']) - 1;
								
								$param['vk_token_count'] = $this->FE->DB->dbSelectFirstRow("SELECT COUNT(*) FROM `nodejs_vk_token` WHERE 1");
								$param['addvkfr_log_count'] = $this->FE->DB->dbSelectFirstRow("SELECT COUNT(*) FROM `nodejs_vk_addvkfr_log` WHERE created_at > '".$today."'");
								
								$tomorrow = $today + 86400 + 1;
								$param['addvkfr_log_count_dyn'] = array();
								for($i = 0; $i < 10; $i++) {
									$param['addvkfr_log_count_dyn'][9 - $i] = 0;
									$today_ = $today - ($i * 86400);
									$tomorrow_ = $tomorrow - ($i * 86400);
									$x = $this->FE->DB->dbSelectFirstRow("SELECT COUNT(*) FROM `nodejs_vk_addvkfr_log` WHERE created_at > '".$today_."' AND created_at < '".$tomorrow_."'");
									$param['addvkfr_log_count_dyn'][9 - $i] = $x['COUNT(*)'];
								}
								
								?>
								
								<div class="textable txt shad " >
									<h4>Привязано аккаунтов к сервисам: <?=$param['vk_token_count']['COUNT(*)'];?></h4>
								</div>
								
								<div class="textable txt shad " >
									<h4>Количество запросов на добавление в друзья за сегодня: <?=$param['addvkfr_log_count']['COUNT(*)'];?></h4>
								</div>
								
								<div class="textable txt shad " >
									<h4>График динамики запросов на добавления в друзья</h4>
									
									<script type="text/javascript" src="https://www.google.com/jsapi"></script>
									<div id="chart_div"></div>
									<script type="text/javascript" >
										google.load('visualization', '1', {packages: ['corechart', 'line']});
										google.setOnLoadCallback(drawBackgroundColor);

										function drawBackgroundColor() {
											var data = new google.visualization.DataTable();
											data.addColumn('number', 'X');
											data.addColumn('number', 'Запросы на добавление в друзья');
											data.addRows([
											
											<?
											if(count($param['addvkfr_log_count_dyn'])) {

												for($i = 9; $i > -1; $i--) {
													$v = $param['addvkfr_log_count_dyn'][$i];
													echo "[$i, $v], ";
												}
											}
											?>
												
											]);
											var options = {
												//hAxis: {title: 'Дней назад'},
												vAxis: {
													title: 'Запросов, ед.'
												},
												backgroundColor: '#ffffff',
											};
											var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
											chart.draw(data, options);
										}
									</script>
								</div>
								
								<?
								}
								?>

							</div>
							
							<div class="clear" ></div>
							
						</div>
					</div>
					
				</div>
				
				
				<div id="iamveryfriendly" class="item-block " >
					
					<a class="menu-btn not-md not-lg iconic ui-btn list" href="#menu" data-title="Добавление в друзья" ></a>
					
					<div class="allmargin grid grid-12" >
						
						<div class="grid-row " >
							
							<div class="clmn-xs-12 clmn-sm-12 clmn-md-12 clmn-lg-12 " >
								
								<form class="iamveryfriendly" >
									
									<?
									if($_SESSION['profile']['id']) {
									?>
									
									<script>
									$(document).ready(function(){
										$(document.body).on('click', '.iamveryfriendly-btn', function(event){
											event.preventDefault();
											
											var btn = $(this);
											
											btn.prop('disabled', 'disabled');
											var form = btn.closest('form');
											var f = form.serialize();
											
											$.post('/vk/ajax/', f, function(data){
												form.find('.submit-result').html(data);
												btn.prop('disabled', false);
												form.trigger('reset');
												
												setTimeout(function(){
													form.find('.submit-result').empty();
												}, 4000);
											});
											
											return false;
										})
									});
									</script>
									
									<?
									}
									?>
									
									<div class="textable txt shad " >
										
										<?
										$app = $this->FE->DB->dbSelectFirstRow("SELECT * FROM `nodejs_vk_app` WHERE id = '1'");
										?>
										
										<p>Для работы с сервисом добавления друзей необходимо пройти идентификацию. Для этого перейдите по ссылке ниже, дайте разрешение приложению, а потом скопируйте URL страницы, куда вас перенаправит, не смотря на предупреждения ВКонтакте.</p>
										<p><b>Данный URL необходим для получения максимальных прав при взаимодействии с API!</b></p>
										<p>&nbsp;</p>
										<p><a class="btn big-btn" href="https://oauth.vk.com/authorize?client_id=<?=$app['appId'];?>&display=popup&redirect_uri=https://api.vk.com/blank.html&scope=friends,photos,audio,video,docs,pages,status,wall,groups,messages,email,notifications,stats,ads,offline&response_type=token&v=5.40&revoke=1" target="_blank" >войти</a></p>
										
										<p>&nbsp;</p>
										<p>&nbsp;</p>
										<p>&nbsp;</p>
										
										<p>Сервис позволяет добавить друзей вашему аккаунту автоматически.</p>
										<p>Вводите необходимые параметры - и он <b>1 раз в 36 минут</b> (<b>40 раз/сутки</b>) отправляет от вашего аккаунта заявку в друзья другому пользователю.</p>
										<p>Если какой-либо параметр ниже не существеннен, то не заполняйте его.</p>
										<p>&nbsp;</p>
										
										<?
										if($_SESSION['profile']['id']) {
										?>
										
										<input type="hidden" name="action" value="iamveryfriendly" />
										<input type="hidden" name="app_id" value="<?=$app['id'];?>" />
										<!--
										hometown название города строкой.
										sex пол, 1 — женщина, 2 — мужчина, 0 (по умолчанию) — любой.
										status семейное положение: 1 — Не женат, 2 — Встречается, 3 — Помолвлен, 4 — Женат, 7 — Влюблён, 5 — Всё сложно, 6 — В активном поиске. 
										age_from начиная с какого возраста.
										age_to до какого возраста.
										company название компании, в которой работают пользователи.
										position название должности.
										group_id идентификатор группы, среди пользователей которой необходимо проводить поиск. 
										-->
										
										<div class="input-block">
											<label >Адрес идентификации из ВКонтакте</label>
											<input type="text" name="url" value="" placeholder="введите адрес с токеном ВКонтакте" />
										</div>
										
										<div class="input-block">
											<label >Название города</label>
											<input type="text" name="p[hometown]" value="" placeholder="" />
										</div>
										
										<div class="input-block">
											<label >Начиная с какого возраста</label>
											<input type="text" name="p[age_from]" value="0" placeholder="" />
										</div>
										
										<div class="input-block">
											<label >До какого возраста</label>
											<input type="text" name="p[age_to]" value="0" placeholder="" />
										</div>
										
										<div class="input-block">
											<label >Пол</label>
											<select name="p[sex]" >
												<option value="0" >любой</option>
												<option value="1" >женщина</option>
												<option value="2" >мужчина</option>
											</select>
										</div>
										
										<div class="input-block">
											<label >Название компании, в которой работают пользователи</label>
											<input type="text" name="p[company]" value="" placeholder="" />
										</div>
										
										<div class="input-block">
											<label >Название должности</label>
											<input type="text" name="p[position]" value="" placeholder="" />
										</div>
										
										<div class="input-block">
											<label >Идентификатор группы, среди пользователей которой необходимо проводить поиск</label>
											<input type="text" name="p[group_id]" value="" placeholder="" />
										</div>
										
										<div class="input-block">
											<label >Сортировка пользователей при добавлении</label>
											<select name="p[sort]" >
												<option value="1" >по дате регистрации</option>
												<option value="0" >по популярности</option>
											</select>
										</div>
										
										<div class="input-block">
											<p>&nbsp;</p>
											<a class="btn big-btn iamveryfriendly-btn" href="#iamveryfriendly-btn" >отправить</a> <span class="submit-result" ></span>
										</div>
										
										<!--
										<div class="input-block">
											<p>&nbsp;</p>
											<p class="submit-result" ></p>
										</div>
										-->
										
										<?
										} else {
										?>
										<p><b>Необходима <a href="/profile/registration/" >регистрация</a> на сайте для добавления заданий.</b></p>
										<p><b>Если уже есть аккаунт, <a href="/profile/" >войдите в него</a>.</b></p>
										<?
										}
										?>
										
									</div>
									
								</form>
								
							</div>
							
							<div class="clear" ></div>
							
						</div>
					</div>
					
				</div>
				
				
				
				
				<div id="" class="item-block " >
					
					<a class="menu-btn not-md not-lg iconic ui-btn list" href="#menu" data-title="Добавление в друзья" ></a>
					
					<div class="allmargin grid grid-12" >
						
						<div class="grid-row " >
							
							<div class="clmn-xs-12 clmn-sm-12 clmn-md-12 clmn-lg-12 " >
								
								<div class="textable txt shad " >
								
									&nbsp;
									
								</div>
								
								
								
								<div id="vk_api_transport"></div>
								<script type="text/javascript">
									/*
									function authInfo(response) {
										if (response.session) {
											//alert('user: '+response.session.mid);
											console.log(response);
										} else {
											alert('not auth');
										}
									}
									window.vkAsyncInit = function() {
										VK.init({
											apiId: 5172708,//5172579
										});
										VK.Auth.getLoginStatus(authInfo);
										VK.UI.button('login_button');
									};
									setTimeout(function() {
										var el = document.createElement("script");
										el.type = "text/javascript";
										el.src = "//vk.com/js/api/openapi.js";
										el.async = true;
										document.getElementById("vk_api_transport").appendChild(el);
									}, 0);
									
									var w;
									function nw() {
										w = window.open('https://oauth.vk.com/authorize?client_id=5172708&display=popup&redirect_uri=https://api.vk.com/blank.html&scope=friends,offline&response_type=token&v=5.40&revoke=1', 'vkw');
									}
									function getw() {
										var url = w.document.location;
										alert(url);
									}
									*/
								</script>
								<div id="login_button" onclick="VK.Auth.login(authInfo);"></div>
								
							</div>
							
							<div class="clear" ></div>
							
						</div>
					</div>
					
				</div>
				
				
			</div>
		</div>
		
		<div class="clear" ></div>
	</div>
	
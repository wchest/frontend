(function(c){function i(a){return typeof a=="object"?a:{top:a,left:a}}var f=c.scrollTo=function(a,b,d){c(window).scrollTo(a,b,d)};f.defaults={axis:"xy",duration:parseFloat(c.fn.jquery)>=1.3?0:1};f.window=function(){return c(window)._scrollable()};c.fn._scrollable=function(){return this.map(function(){if(this.nodeName&&c.inArray(this.nodeName.toLowerCase(),["iframe","#document","html","body"])==-1)return this;var a=(this.contentWindow||this).document||this.ownerDocument||this;return c.browser.safari||
a.compatMode=="BackCompat"?a.body:a.documentElement})};c.fn.scrollTo=function(a,b,d){typeof b=="object"&&(d=b,b=0);typeof d=="function"&&(d={onAfter:d});a=="max"&&(a=9E9);d=c.extend({},f.defaults,d);b=b||d.speed||d.duration;d.queue=d.queue&&d.axis.length>1;d.queue&&(b/=2);d.offset=i(d.offset);d.over=i(d.over);return this._scrollable().each(function(){function e(c){l.animate(j,b,d.easing,c&&function(){c.call(this,a,d)})}var h=this,l=c(h),g=a,m,j={},p=l.is("html,body");switch(typeof g){case "number":case "string":if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(g)){g=
i(g);break}g=c(g,this);case "object":if(g.is||g.style)m=(g=c(g)).offset()}c.each(d.axis.split(""),function(a,b){var c=b=="x"?"Left":"Top",i=c.toLowerCase(),k="scroll"+c,n=h[k],o=f.max(h,b);m?(j[k]=m[i]+(p?0:n-l.offset()[i]),d.margin&&(j[k]-=parseInt(g.css("margin"+c))||0,j[k]-=parseInt(g.css("border"+c+"Width"))||0),j[k]+=d.offset[i]||0,d.over[i]&&(j[k]+=g[b=="x"?"width":"height"]()*d.over[i])):(c=g[i],j[k]=c.slice&&c.slice(-1)=="%"?parseFloat(c)/100*o:c);/^\d+$/.test(j[k])&&(j[k]=j[k]<=0?0:Math.min(j[k],
o));!a&&d.queue&&(n!=j[k]&&e(d.onAfterFirst),delete j[k])});e(d.onAfter)}).end()};f.max=function(a,b){var d=b=="x"?"Width":"Height",e="scroll"+d;if(!c(a).is("html,body"))return a[e]-c(a)[d.toLowerCase()]();var d="client"+d,h=a.ownerDocument.documentElement,l=a.ownerDocument.body;return Math.max(h[e],l[e])-Math.min(h[d],l[d])}})(jQuery);
(function(c){c.flexslider=function(i,f){var a=i;a.init=function(){a.vars=c.extend({},c.flexslider.defaults,f);a.data("flexslider",true);a.container=c(".slides",a);a.slides=c(".slides > li",a);a.count=a.slides.length;a.animating=false;a.currentSlide=a.vars.slideToStart;a.animatingTo=a.currentSlide;a.atEnd=a.currentSlide==0?true:false;a.eventType="ontouchstart"in document.documentElement?"touchstart":"click";a.cloneCount=0;a.cloneOffset=0;if(a.vars.controlsContainer!="")a.controlsContainer=c(a.vars.controlsContainer).eq(c(".slides").index(a.container)),
a.containerExists=a.controlsContainer.length>0;if(a.vars.manualControls!="")a.manualControls=c(a.vars.manualControls,a.containerExists?a.controlsContainer:a),a.manualExists=a.manualControls.length>0;a.vars.randomize&&(a.slides.sort(function(){return Math.round(Math.random())-0.5}),a.container.empty().append(a.slides));if(a.vars.animation.toLowerCase()=="slide"){a.css({overflow:"hidden"});if(a.vars.animationLoop)a.cloneCount=2,a.cloneOffset=1,a.container.append(a.slides.filter(":first").clone().addClass("clone")).prepend(a.slides.filter(":last").clone().addClass("clone"));
a.container.width((a.count+a.cloneCount)*a.width()+2E3);a.newSlides=c(".slides > li",a);setTimeout(function(){a.newSlides.width(a.width()).css({"float":"left"}).show()},100);a.container.css({marginLeft:-1*(a.currentSlide+a.cloneOffset)*a.width()+"px"})}else a.slides.css({width:"100%","float":"left",marginRight:"-100%"}).eq(a.currentSlide).fadeIn(400);if(a.vars.controlNav){if(a.manualExists)a.controlNav=a.manualControls;else{for(var b=c('<ol class="flex-control-nav"></ol>'),d=1,e=0;e<a.count;e++)b.append("<li><a>"+
d+"</a></li>"),d++;a.containerExists?(c(a.controlsContainer).append(b),a.controlNav=c(".flex-control-nav li a",a.controlsContainer)):(a.append(b),a.controlNav=c(".flex-control-nav li a",a))}a.controlNav.eq(a.currentSlide).addClass("active");a.controlNav.bind(a.eventType,function(b){b.preventDefault();c(this).hasClass("active")||a.flexAnimate(a.controlNav.index(c(this)),a.vars.pauseOnAction)})}if(a.vars.directionNav)b=c('<ul class="flex-direction-nav"><li><a class="prev" href="#">'+a.vars.prevText+
'</a></li><li><a class="next" href="#">'+a.vars.nextText+"</a></li></ul>"),a.containerExists?(c(a.controlsContainer).append(b),a.directionNav=c(".flex-direction-nav li a",a.controlsContainer)):(a.append(b),a.directionNav=c(".flex-direction-nav li a",a)),a.vars.animationLoop||(a.currentSlide==0?a.directionNav.filter(".prev").addClass("disabled"):a.currentSlide==a.count-1&&a.directionNav.filter(".next").addClass("disabled")),a.directionNav.bind(a.eventType,function(b){b.preventDefault();b=c(this).hasClass("next")?
a.getTarget("next"):a.getTarget("prev");a.canAdvance(b)&&a.flexAnimate(b,a.vars.pauseOnAction)});a.vars.keyboardNav&&c("ul.slides").length==1&&c(document).keyup(function(b){if(!a.animating&&!(b.keyCode!=39&&b.keyCode!=37)){if(b.keyCode==39)var c=a.getTarget("next");else b.keyCode==37&&(c=a.getTarget("prev"));a.canAdvance(c)&&a.flexAnimate(c,a.vars.pauseOnAction)}});if(a.vars.slideshow)a.vars.pauseOnHover&&a.vars.slideshow&&a.hover(function(){a.pause()},function(){a.resume()}),a.animatedSlides=setInterval(a.animateSlides,
a.vars.slideshowSpeed);if(a.vars.pausePlay)b=c('<div class="flex-pauseplay"><span></span></div>'),a.containerExists?(a.controlsContainer.append(b),a.pausePlay=c(".flex-pauseplay span",a.controlsContainer)):(a.append(b),a.pausePlay=c(".flex-pauseplay span",a)),b=a.vars.slideshow?"pause":"play",a.pausePlay.addClass(b).text(b=="pause"?a.vars.pauseText:a.vars.playText),a.pausePlay.click(function(b){b.preventDefault();c(this).hasClass("pause")?a.pause():a.resume()});a.vars.touchSwipe&&"ontouchstart"in
document.documentElement&&a.each(function(){function b(){this.removeEventListener("touchmove",c);e=null;isMoving=false}function c(d){isMoving&&(d=e-d.touches[0].pageX,Math.abs(d)>=f&&(b(),d=d>0?a.getTarget("next"):a.getTarget("prev"),a.canAdvance(d)&&a.flexAnimate(d,a.vars.pauseOnAction)))}function d(a){if(a.touches.length==1)e=a.touches[0].pageX,isMoving=true,this.addEventListener("touchmove",c,false)}var e,f=20;isMoving=false;"ontouchstart"in document.documentElement&&this.addEventListener("touchstart",
d,false)});a.vars.animation.toLowerCase()=="slide"&&c(window).resize(function(){a.newSlides.width(a.width());a.container.width((a.count+a.cloneCount)*a.width()+2E3);clearTimeout(a.sliderTimer);a.sliderTimer=setTimeout(function(){a.flexAnimate(a.currentSlide)},300)});a.vars.start(a)};a.flexAnimate=function(b,c){if(!a.animating)a.animating=true,a.animatingTo=b,a.vars.before(a),c&&a.pause(),a.vars.controlNav&&a.controlNav.removeClass("active").eq(b).addClass("active"),a.atEnd=b==0||b==a.count-1?true:
false,!a.vars.animationLoop&&a.vars.directionNav&&(b==0?a.directionNav.removeClass("disabled").filter(".prev").addClass("disabled"):b==a.count-1?a.directionNav.removeClass("disabled").filter(".next").addClass("disabled"):a.directionNav.removeClass("disabled")),!a.vars.animationLoop&&b==a.count-1&&(a.pause(),a.vars.end(a)),a.vars.animation.toLowerCase()=="slide"?(a.slideString=a.currentSlide==0&&b==a.count-1&&a.vars.animationLoop&&a.direction!="next"?"0px":a.currentSlide==a.count-1&&b==0&&a.vars.animationLoop&&
a.direction!="prev"?-1*(a.count+1)*a.slides.filter(":first").width()+"px":-1*(b+a.cloneOffset)*a.slides.filter(":first").width()+"px",a.container.animate({marginLeft:a.slideString},a.vars.animationDuration,function(){a.currentSlide==0&&b==a.count-1&&a.vars.animationLoop?a.container.css({marginLeft:-1*a.count*a.slides.filter(":first").width()+"px"}):a.currentSlide==a.count-1&&b==0&&a.vars.animationLoop&&a.container.css({marginLeft:-1*a.slides.filter(":first").width()+"px"});a.animating=false;a.currentSlide=
b;a.vars.after(a)})):(a.slides.eq(a.currentSlide).fadeOut(a.vars.animationDuration),a.slides.eq(b).fadeIn(a.vars.animationDuration,function(){a.animating=false;a.currentSlide=b;a.vars.after(a)}))};a.animateSlides=function(){a.animating||a.flexAnimate(a.currentSlide==a.count-1?0:a.currentSlide+1)};a.pause=function(){clearInterval(a.animatedSlides);a.vars.pausePlay&&a.pausePlay.removeClass("pause").addClass("play").text(a.vars.playText)};a.resume=function(){a.animatedSlides=setInterval(a.animateSlides,
a.vars.slideshowSpeed);a.vars.pausePlay&&a.pausePlay.removeClass("play").addClass("pause").text(a.vars.pauseText)};a.canAdvance=function(b){return!a.vars.animationLoop&&a.atEnd?a.currentSlide==0&&b==a.count-1&&a.direction!="next"?false:a.currentSlide==a.count-1&&b==0&&a.direction=="next"?false:true:true};a.getTarget=function(b){a.direction=b;return b=="next"?a.currentSlide==a.count-1?0:a.currentSlide+1:a.currentSlide==0?a.count-1:a.currentSlide-1};a.init()};c.flexslider.defaults={animation:"fade",
slideshow:true,slideshowSpeed:7E3,animationDuration:600,directionNav:true,controlNav:true,keyboardNav:true,touchSwipe:true,prevText:"Previous",nextText:"Next",pausePlay:false,pauseText:"Pause",playText:"Play",randomize:false,slideToStart:0,animationLoop:true,pauseOnAction:true,pauseOnHover:false,controlsContainer:"",manualControls:"",start:function(){},before:function(){},after:function(){},end:function(){}};c.fn.flexslider=function(i){return this.each(function(){c(this).find(".slides li").length==
1?c(this).find(".slides li").fadeIn(400):c(this).data("flexslider")!=true&&new c.flexslider(c(this),i)})}})(jQuery);
(function(c){function i(){var a=this,b=setTimeout(function(){a.$element.unbind(e);f.call(a)},500);this.$element.one(e,function(){clearTimeout(b);f.call(a)})}function f(){this.$element.hide().trigger("hidden");a.call(this)}function a(a){var d=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.settings.backdrop){var h=c.support.transition&&d;this.$backdrop=c('<div class="modal-backdrop '+d+'" />').appendTo(document.body);this.settings.backdrop!="static"&&this.$backdrop.click(c.proxy(this.hide,
this));this.$backdrop.addClass("in");h?this.$backdrop.one(e,a):a()}else!this.isShown&&this.$backdrop?(this.$backdrop.removeClass("in"),c.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one(e,c.proxy(b,this)):b.call(this)):a&&a()}function b(){this.$backdrop.remove();this.$backdrop=null}function d(){var a=this;this.isShown&&this.settings.keyboard?c(document).bind("keyup.modal",function(b){b.which==27&&a.hide()}):this.isShown||c(document).unbind("keyup.modal")}var e;c(document).ready(function(){var a=
(document.body||document.documentElement).style;c.support.transition=a.transition!==void 0||a.WebkitTransition!==void 0||a.MozTransition!==void 0||a.MsTransition!==void 0||a.OTransition!==void 0;c.support.transition&&(e="TransitionEnd",c.browser.webkit?e="webkitTransitionEnd":c.browser.mozilla?e="transitionend":c.browser.opera&&(e="oTransitionEnd"))});var h=function(a,b){this.settings=c.extend({},c.fn.modal.defaults,b);this.$element=c(a).delegate(".close","click.modal",c.proxy(this.hide,this));this.settings.show&&
this.show();return this};h.prototype={toggle:function(){return this[!this.isShown?"show":"hide"]()},show:function(){var b=this;this.isShown=true;this.$element.trigger("show");d.call(this);a.call(this,function(){var a=c.support.transition&&b.$element.hasClass("fade");b.$element.appendTo(document.body).show();b.$element.addClass("in");a?b.$element.one(e,function(){b.$element.trigger("shown")}):b.$element.trigger("shown")});return this},hide:function(a){a&&a.preventDefault();if(!this.isShown)return this;
this.isShown=false;d.call(this);this.$element.trigger("hide").removeClass("in");c.support.transition&&this.$element.hasClass("fade")?i.call(this):f.call(this);return this}};c.fn.modal=function(a){var b=this.data("modal");if(!b)return typeof a=="string"&&(a={show:/show|toggle/.test(a)}),this.each(function(){c(this).data("modal",new h(this,a))});if(a===true)return b;if(typeof a=="string")b[a]();else b&&b.toggle();return this};c.fn.modal.Modal=h;c.fn.modal.defaults={backdrop:false,keyboard:false,show:false};
c(document).ready(function(){c("body").delegate("[data-controls-modal]","click",function(a){a.preventDefault();a=c(this).data("show",true);c("#"+a.attr("data-controls-modal")).modal(a.data())})})})(window.jQuery||window.ender);
var opTheme=function(){var c=function(a){console!==void 0&&console.log!==void 0&&console.log(a)},i=function(a){var b="";arguments.length>1&&(arguments[1]=="error"?b="error":arguments[1]=="confirm"&&(b="success"));return'<div class="alert-message block-message '+b+'"><a class="modal-close-click close" href="#">x</a>'+a+"</div>"},f=void 0;return{callback:{keyboard:function(){c("keyboard!!!!")},actionDelete:function(a){a.preventDefault();var a=$(a.target),b=a.attr("href")+".json",c=a.attr("data-id");
OP.Util.makeRequest(b,a.parent().serializeArray(),function(a){a.code===200?$(".action-container-"+c).hide("medium",function(){$(this).remove()}):opTheme.message.error("Could not delete the photo.")});return false},batchAdd:function(a){$(".id-"+a.id).removeClass("unpinned").addClass("pinned");opTheme.ui.batchMessage();c("Adding photo "+a.id)},batchClear:function(){var a=$("#batch-message").parent();$(".pinned").removeClass("pinned").addClass("unpinned").children().filter(".pin").fadeOut();a.slideUp("fast",
function(){$(this).remove()})},batchModal:function(){$("#modal").html('<div class="modal-header">  <a href="#" class="close">&times;</a>  <h3>Batch edit your pinned photos</h3></div><div class="modal-body">  <p><form id="batch-edit">  <div class="clearfix">    <label>Property</label>    <div class="input">      <select id="batch-key" name="property"><option value="permission">Permission</option></select>    </div>  </div>  <div class="clearfix">    <label>Value</label>    <div class="input">      <ul class="inputs-list">        <li>          <label>            <input type="radio" name="permission" value="1" checked="checked">            <span>Public</span>          </label>        </li>        <li>          <label>            <input type="radio" name="permission" value="0">             <span>Private</span>          </label>        </li>    </div>  </div></form></p></div><div class="modal-footer"><a href="#" class="btn photo-update-batch-click">Update</a></div>')},
batchRemove:function(a){$(".id-"+a).addClass("unpinned").removeClass("pinned");opTheme.ui.batchMessage();c("Removing photo "+a)},commentJump:function(a){a.preventDefault();$.scrollTo($("div.comment-form"),200);return false},credentailDelete:function(a){a.preventDefault();var b=$(a.target),a=b.attr("href")+".json";OP.Util.makeRequest(a,{},function(a){a.code===200?(b.parent().remove(),opTheme.message.confirm("Credential successfully deleted.")):opTheme.message.error("Could not delete credential.")});
return false},groupCheckbox:function(a){a=$(a.target);a.hasClass("none")&&a.is(":checked")?$("input.group-checkbox:not(.none)").removeAttr("checked"):a.is(":checked")&&$("input.group-checkbox.none").removeAttr("checked")},groupPost:function(a){a.preventDefault();var a=$(a.target).parent(),b=a.attr("action")+".json",c=b.search("create")>-1;OP.Util.makeRequest(b,a.serializeArray(),function(a){a.code===200?c?location.href=location.href:opTheme.message.confirm("Group updated successfully."):opTheme.message.error("Could not update group.")});
return false},login:function(a){a=$(a.target);a.hasClass("browserid")?navigator.id.getVerifiedEmail(function(a){a?opTheme.user.browserid.loginSuccess(a):opTheme.user.browserid.loginFailure(a)}):a.hasClass("facebook")&&FB.login(function(a){a.authResponse?(console.log("User logged in, posting to openphoto host."),OP.Util.makeRequest("/user/facebook/login.json",opTheme.user.base.loginProcessed)):console.log("User cancelled login or did not fully authorize.")},{scope:"email"})},modalClose:function(a){a.preventDefault();
$(a.target).parent().slideUp("fast",function(){$(this).remove()})},photoDelete:function(a){a.preventDefault();var b=$(a.target),a=b.parent().attr("action")+".json";OP.Util.makeRequest(a,b.parent().serializeArray(),function(a){a.code===200?(b.html("This photo has been deleted"),opTheme.message.confirm("This photo has been deleted.")):opTheme.message.error("Could not delete the photo.")});return false},photoEdit:function(a){a.preventDefault();a=$(a.target).attr("href")+".json";$("div.owner-edit").length==
1?$.scrollTo($("div.owner-edit"),200):OP.Util.makeRequest(a,{},function(a){a.code===200?($("#main").append(a.result.markup),$.scrollTo($("div.owner-edit"),200)):opTheme.message.error("Could not load the form to edit this photo.")},"json","get");return false},photoUpdateBatch:function(a){a.preventDefault();$(a.target);var a=$("#batch-key").val(),b=$("form#batch-edit").find("input[name~='permission']:checked").val();params={};params[a]=b;params.ids=OP.Batch.collection.getIds().join(",");console.log(params);
$.post("/photos/update.json",params,opTheme.callback.photoUpdateBatchCb,"json")},photoUpdateBatchCb:function(a){a.code==200?opTheme.message.append(i("Your photos were successfully updated.","confirm")):opTheme.message.append(i("There was a problem updating your photos.","error"));$("#modal").modal("hide")},pinClick:function(a){var a=$(a.target),b=a.attr("data-id");a.parent().hasClass("unpinned")?OP.Batch.add(b):OP.Batch.remove(b)},pinClearClick:function(a){a.preventDefault();OP.Batch.clear()},pinOver:function(a){$(a.target).parent().prev().fadeIn("fast")},
pinOut:function(a){$(a.target).filter('[class~="unpinned"]').children().filter(".pin").filter(":visible").fadeOut("fast")},pluginStatus:function(a){a.preventDefault();a=$(a.target).attr("href")+".json";OP.Util.makeRequest(a,{},function(a){a.code===200?window.location.reload():opTheme.message.error("Could not update the status of this plugin.")},"json","post");return false},pluginUpdate:function(a){a.preventDefault();var a=$(a.target).parent(),b=a.attr("action")+".json";OP.Util.makeRequest(b,a.serializeArray(),
function(a){a.code===200?opTheme.message.confirm("Your plugin was successfully updated."):opTheme.message.error("Could not update the status of this plugin.")},"json","post");return false},searchByTags:function(a){a.preventDefault();var b=$(a.target).parent(),a=$(b.find("input[name=tags]")[0]).val(),b=$(b).attr("action");location.href=a.length>0?b.replace("/list","")+"/tags-"+a+"/list":b;return false},settings:function(){$("ul#settingsbar").slideToggle("medium");$("li#nav-signin").toggleClass("active");
return false},keyBrowseNext:function(){var a;if(a=$(".image-pagination .next a").attr("href"))location.href=a},keyBrowsePrevious:function(){var a;if(a=$(".image-pagination .previous a").attr("href"))location.href=a},webhookDelete:function(a){a.preventDefault();var b=$(a.target),a=b.attr("href")+".json";OP.Util.makeRequest(a,{},function(a){a.code===200?(b.parent().remove(),opTheme.message.confirm("Credential successfully deleted.")):opTheme.message.error("Could not delete credential.")});return false}},
formHandlers:{hasErrors:function(a,b){var c=[];a.children("input, textarea").each(function(){var e=$(this);e.prev().removeClass("error");var h=e.attr(b);if(h!=void 0)for(var h=h.split(" "),f=0;f<h.length;f++){if(h[f]=="date"&&!opTheme.formHandlers.passesDate(e)){var g=e.prev().html()+" is not a valid date";c.push([e,g])}h[f]=="email"&&!opTheme.formHandlers.passesEmail(e)&&(g=e.prev().html()+" is not a valid email address",c.push([e,g]));h[f]=="ifexists"&&e.val()!=""&&e.val()!=void 0&&$.merge(c,opTheme.formHandlers.hasErrors(a,
"data-ifexists"));h[f]=="integer"&&!opTheme.formHandlers.passesInteger(e)&&(g=e.prev().html()+" is not a number",c.push([e,g]));h[f]=="match"&&(g=e.attr("data-match"),opTheme.formHandlers.passesMatch(e,g)||(g=e.prev().html()+" does not match "+$("#"+g).prev().html(),c.push([e,g])));h[f]=="required"&&!opTheme.formHandlers.passesRequired(e)&&(g=e.prev().html()+" is required",c.push([e,g]));h[f]=="alphanumeric"&&!opTheme.formHandlers.passesAlphaNumeric(e)&&(g=e.prev().html()+" can only contain alpha-numeric characters",
c.push([e,g]))}});return c},init:function(){$(this).submit(opTheme.submitHandlers.siteForm);opTheme.formHandlers.showPlaceholders();$("input[data-placeholder]").live("focus",opTheme.formHandlers.placeholderFocus);$("input[data-placeholder]").live("blur",opTheme.formHandlers.placeholderBlur)},passesAlphaNumeric:function(a){return/^[a-zA-Z0-9]+$/.test(a.val())},passesDate:function(a){return/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(a.val())},passesEmail:function(a){return/^([\w-\.+]+@([\w-]+\.)+[\w-]{2,4})?$/.test(a.val())},
passesInteger:function(a){return/^\d+$/.test(a.val())},passesMatch:function(a,b){return a.val()==$("#"+b).val()},passesRequired:function(a){return a.is("textarea")||a.is("input")&&(a.attr("type")=="text"||a.attr("type")=="password")?a.val()!=""&&a.val()!=void 0:a.is("checkbox")?a.is(":checked"):true},placeholderBlur:function(){var a=$(this);a.val()==""&&(a.val(a.attr("data-placeholder")),a.addClass("placeholder"))},placeholderFocus:function(){var a=$(this);a.val()==a.attr("data-placeholder")&&(a.val(""),
a.removeClass("placeholder"))},removePlaceholders:function(){$("input[data-placeholder]").each(function(){var a=$(this);a.val()==a.attr("data-placeholder")&&(a.val(""),a.removeClass("placeholder"))})},showPlaceholders:function(){$("input[data-placeholder]").each(function(){var a=$(this);a.val()==""&&(a.val(a.attr("data-placeholder")),a.addClass("placeholder"))})}},front:{init:function(a){a.length>0&&a.cycle({fx:"fade"}).find("img").click(function(a){location.href=$(a.target).attr("data-origin")})}},
init:{load:function(){$("section#slideshow").length>0&&$(window).load(function(){$(".flexslider").flexslider({animation:"slide",controlsContainer:".flex-container",controlNav:true,pausePlay:false,directionNav:true,nextText:"<span title='Next'>Next</span>",prevText:"<span title='Previous'>Previous</span>"})});$("#modal").modal({keyboard:true,backdrop:"static"})},attach:function(){OP.Util.on("click:action-delete",opTheme.callback.actionDelete);OP.Util.on("click:action-jump",opTheme.callback.commentJump);
OP.Util.on("click:batch-modal",opTheme.callback.batchModal);OP.Util.on("click:credential-delete",opTheme.callback.credentailDelete);OP.Util.on("click:group-checkbox",opTheme.callback.groupCheckbox);OP.Util.on("click:group-update",opTheme.callback.groupPost);OP.Util.on("click:login",opTheme.callback.login);OP.Util.on("click:modal-close",opTheme.callback.modalClose);OP.Util.on("click:photo-delete",opTheme.callback.photoDelete);OP.Util.on("click:photo-edit",opTheme.callback.photoEdit);OP.Util.on("click:photo-update-batch",
opTheme.callback.photoUpdateBatch);OP.Util.on("click:plugin-status",opTheme.callback.pluginStatus);OP.Util.on("click:plugin-update",opTheme.callback.pluginUpdate);OP.Util.on("click:nav-item",opTheme.callback.searchBarToggle);OP.Util.on("click:search",opTheme.callback.searchByTags);OP.Util.on("click:settings",opTheme.callback.settings);OP.Util.on("click:webhook-delete",opTheme.callback.webhookDelete);OP.Util.on("click:pin",opTheme.callback.pinClick);OP.Util.on("click:pin-clear",opTheme.callback.pinClearClick);
OP.Util.on("keydown:browse-next",opTheme.callback.keyBrowseNext);OP.Util.on("keydown:browse-previous",opTheme.callback.keyBrowsePrevious);OP.Util.on("mouseover:pin",opTheme.callback.pinOver);OP.Util.on("mouseout:pin",opTheme.callback.pinOut);OP.Util.on("callback:batch-add",opTheme.callback.batchAdd);OP.Util.on("callback:batch-remove",opTheme.callback.batchRemove);OP.Util.on("callback:batch-clear",opTheme.callback.batchClear);typeof OPU==="object"&&OPU.init();$("form.validate").each(opTheme.formHandlers.init)},
photos:function(){var a=OP.Batch.collection.getAll(),b=OP.Batch.collection.getLength(),c=$(".unpinned"),e,f;b>0&&opTheme.ui.batchMessage();c.each(function(b,c){c=$(c);e=c.attr("class");f=e.match(/ id-([a-z0-9]+)/);f.length==2&&a[f[1]]!==void 0&&c.removeClass("unpinned").addClass("pinned")})}},message:{append:function(a){$("#message").append(a).slideDown()},close:function(){f!=void 0&&(clearTimeout(f),f=void 0,$("#message-box").animate({height:"toggle"},500,function(){$("#message-box").remove()}))},
confirm:function(a){opTheme.message.show(a,"confirm")},error:function(a){opTheme.message.show(a,"error")},show:function(a,b){var c=b=="error"?"confirm":"error";f!=void 0?(clearTimeout(f),f=void 0,$("#message-box").removeClass(c).addClass(b).html('<div><a class="message-close">close</a>'+a+"</div>"),f=setTimeout(function(){$("#message-box").animate({height:"toggle"},500,function(){$("#message-box").remove();f=void 0})},7E3)):($("html").append('<section id="message-box" style="display:none;"><div><a class="message-close">close</a>'+
a+"</div></section>"),$("#message-box").removeClass(c).addClass(b).animate({height:"toggle"},500,function(){f=setTimeout(function(){$("#message-box").animate({height:"toggle"},500,function(){$("#message-box").remove();f=void 0})},7E3)}));$("a.message-close").click(opTheme.message.close)}},submitHandlers:{siteForm:function(a){var b=$(this);a.preventDefault();opTheme.formHandlers.removePlaceholders();a=opTheme.formHandlers.hasErrors(b,"data-validation");opTheme.formHandlers.showPlaceholders();if(a.length==
0)this.submit();else{for(var b="<ul>",c=0;c<a.length;c++)a[c][0].prev().addClass("error"),b+="<li>"+a[c][1]+"</li>";b+="</ul>";$("html").animate({scrollTop:a[0][0].offset().top-30},500);a[0][0].focus();opTheme.message.error(b)}}},ui:{batchMessage:function(){var a=OP.Batch.collection.getLength();$("#batch-message").length>0&&a>0?$("#batch-count").html(a):a==0?$("#batch-message").parent().slideUp("fast",function(){$(this).remove()}):opTheme.message.append(i('  <a id="batch-message"></a>You have <span id="batch-count">'+
a+'</span> photos pinned.  <div class="alert-actions"><a class="btn small info batch-modal-click" data-controls-modal="modal" data-backdrop="static">Batch edit</a><a href="#" class="btn small pin-clear-click">Or clear pins</a></div>'))}},user:{base:{loginProcessed:function(a){a.code!=200?c("processing of login failed"):(c("login processing succeeded"),window.location.reload())}},browserid:{loginFailure:function(){c("login failed")},loginSuccess:function(a){OP.Util.makeRequest("/user/browserid/login.json",
{assertion:a},opTheme.user.base.loginProcessed)}}}}}();

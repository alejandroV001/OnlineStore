"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[592],{3449:(v,g,r)=>{r.d(g,{b:()=>i});var t=r(1571),p=r(6895),c=r(7046);function u(n,a){1&n&&(t.TgZ(0,"th",4)(1,"div",6),t._uU(2,"Remove"),t.qZA()())}function l(n,a){if(1&n&&(t.TgZ(0,"span",25),t._uU(1),t.qZA()),2&n){const e=t.oxw().$implicit;t.xp6(1),t.hij("Type: ",e.type,"")}}function d(n,a){if(1&n){const e=t.EpF();t.TgZ(0,"i",26),t.NdJ("click",function(){t.CHM(e);const _=t.oxw().$implicit,T=t.oxw(2);return t.KtG(T.decrementItemQuantity(_))}),t.qZA()}}function s(n,a){if(1&n){const e=t.EpF();t.TgZ(0,"i",27),t.NdJ("click",function(){t.CHM(e);const _=t.oxw().$implicit,T=t.oxw(2);return t.KtG(T.incrementItemQuantity(_))}),t.qZA()}}function h(n,a){if(1&n){const e=t.EpF();t.TgZ(0,"i",28),t.NdJ("click",function(){t.CHM(e);const _=t.oxw().$implicit,T=t.oxw(2);return t.KtG(T.removeBasketItem(_))}),t.qZA()}}function m(n,a){if(1&n&&(t.TgZ(0,"tr",9)(1,"th",10)(2,"div",11),t._UZ(3,"img",12),t.TgZ(4,"div",13)(5,"h5",14)(6,"a",15),t._uU(7),t.qZA()(),t.YNc(8,l,2,1,"span",16),t.qZA()()(),t.TgZ(9,"td",17)(10,"strong"),t._uU(11),t.ALo(12,"currency"),t.qZA()(),t.TgZ(13,"td",17)(14,"div",18),t.YNc(15,d,1,0,"i",19),t.TgZ(16,"span",20),t._uU(17),t.qZA(),t.YNc(18,s,1,0,"i",21),t.qZA()(),t.TgZ(19,"td",17)(20,"strong"),t._uU(21),t.ALo(22,"currency"),t.qZA()(),t.TgZ(23,"td",22)(24,"a",23),t.YNc(25,h,1,0,"i",24),t.qZA()()()),2&n){const e=a.$implicit,o=t.oxw(2);t.xp6(3),t.s9C("src",e.pictureUrl,t.LSH),t.s9C("alt",e.name),t.xp6(3),t.MGl("routerLink","/shop/",e.id||e.productId,""),t.xp6(1),t.Oqu(e.name),t.xp6(1),t.Q6J("ngIf",e.type),t.xp6(3),t.Oqu(t.lcZ(12,13,e.price)),t.xp6(3),t.ekj("justify-content-center",!o.isBasket),t.xp6(1),t.Q6J("ngIf",o.isBasket),t.xp6(2),t.Oqu(e.quantity),t.xp6(1),t.Q6J("ngIf",o.isBasket),t.xp6(3),t.Oqu(t.lcZ(22,15,e.price*e.quantity)),t.xp6(4),t.Q6J("ngIf",o.isBasket)}}function f(n,a){if(1&n&&(t.ynx(0),t.TgZ(1,"div",1)(2,"table",2)(3,"thead",3)(4,"tr")(5,"th",4)(6,"div",5),t._uU(7,"Product"),t.qZA()(),t.TgZ(8,"th",4)(9,"div",6),t._uU(10,"Price"),t.qZA()(),t.TgZ(11,"th",4)(12,"div",6),t._uU(13,"Quantity"),t.qZA()(),t.TgZ(14,"th",4)(15,"div",6),t._uU(16,"Total"),t.qZA()(),t.YNc(17,u,3,0,"th",7),t.qZA()(),t.TgZ(18,"tbody"),t.YNc(19,m,26,17,"tr",8),t.qZA()()(),t.BQk()),2&n){const e=t.oxw();t.xp6(3),t.ekj("bg-light",e.isBasket||e.isOrder),t.xp6(14),t.Q6J("ngIf",e.isBasket),t.xp6(2),t.Q6J("ngForOf",e.items)}}let i=(()=>{class n{constructor(){this.decrement=new t.vpe,this.increment=new t.vpe,this.remove=new t.vpe,this.isBasket=!0,this.isOrder=!0}ngOnInit(){}decrementItemQuantity(e){this.decrement.emit(e)}incrementItemQuantity(e){this.increment.emit(e)}removeBasketItem(e){this.remove.emit(e)}}return n.\u0275fac=function(e){return new(e||n)},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-basket-summary"]],inputs:{isBasket:"isBasket",items:"items",isOrder:"isOrder"},outputs:{decrement:"decrement",increment:"increment",remove:"remove"},decls:1,vars:1,consts:[[4,"ngIf"],[1,"table-responsive"],[1,"table","table-borderless"],[1,"border-0","py-2"],["scope","col",1,"border-0"],[1,"p-2","px-3","text-uppercase"],[1,"py-2","text-uppercase"],["scope","col","class","border-0",4,"ngIf"],["class","border-0",4,"ngFor","ngForOf"],[1,"border-0"],["scope","row"],[1,"p-0"],[1,"img-fluid",2,"max-height","75px",3,"src","alt"],[1,"ml-3","d-inline-block","align-middle"],[1,"mb-0"],[1,"text-dark",3,"routerLink"],["class","text-muted font-weight-normal font-italic d-block",4,"ngIf"],[1,"align-middle"],[1,"d-flex","align-items-center"],["class","fa fa-minus-circle text-warning me-2","style","cursor: pointer; font-size: 2em;",3,"click",4,"ngIf"],[1,"font-weight:","bold;",2,"font-size","1.1em"],["class","fa fa-plus-circle text-warning mx-2","style","cursor: pointer; font-size: 2em;",3,"click",4,"ngIf"],[1,"align-middle","text-center"],[1,"text-danger"],["class","fa fa-trash","style","font-size: 2em; cursor: pointer;",3,"click",4,"ngIf"],[1,"text-muted","font-weight-normal","font-italic","d-block"],[1,"fa","fa-minus-circle","text-warning","me-2",2,"cursor","pointer","font-size","2em",3,"click"],[1,"fa","fa-plus-circle","text-warning","mx-2",2,"cursor","pointer","font-size","2em",3,"click"],[1,"fa","fa-trash",2,"font-size","2em","cursor","pointer",3,"click"]],template:function(e,o){1&e&&t.YNc(0,f,20,4,"ng-container",0),2&e&&t.Q6J("ngIf",o.items.length>0)},dependencies:[p.sg,p.O5,c.yS,p.H9]}),n})()},6241:(v,g,r)=>{r.d(g,{P:()=>u});var t=r(1571),p=r(2521),c=r(433);let u=(()=>{class l{constructor(){this.pageChanged=new t.vpe}ngOnInit(){}onPagerChange(s){this.pageChanged.emit(s.page)}}return l.\u0275fac=function(s){return new(s||l)},l.\u0275cmp=t.Xpm({type:l,selectors:[["app-pager"]],inputs:{totalCount:"totalCount",pageSize:"pageSize",pageNumber:"pageNumber"},outputs:{pageChanged:"pageChanged"},decls:1,vars:4,consts:[["previousText","\u2039","nextText","\u203a","firstText","\xab","lastText","\xbb",3,"boundaryLinks","totalItems","ngModel","itemsPerPage","pageChanged"]],template:function(s,h){1&s&&(t.TgZ(0,"pagination",0),t.NdJ("pageChanged",function(f){return h.onPagerChange(f)}),t.qZA()),2&s&&t.Q6J("boundaryLinks",!0)("totalItems",h.totalCount)("ngModel",h.pageNumber)("itemsPerPage",h.pageSize)},dependencies:[p.Qt,c.JJ,c.On]}),l})()},4015:(v,g,r)=>{r.d(g,{t:()=>i});var t=r(1571),p=r(433),c=r(6895);const u=["input"];function l(n,a){1&n&&t._UZ(0,"div",7)}function d(n,a){if(1&n&&(t.TgZ(0,"span"),t._uU(1),t.qZA()),2&n){const e=t.oxw(2);t.xp6(1),t.hij("",e.label," is required")}}function s(n,a){1&n&&(t.TgZ(0,"span"),t._uU(1,"Invalid email address"),t.qZA())}function h(n,a){if(1&n&&(t.TgZ(0,"div",8),t.YNc(1,d,2,1,"span",9),t.YNc(2,s,2,0,"span",9),t.qZA()),2&n){const e=t.oxw();t.xp6(1),t.Q6J("ngIf",null==e.controlDir.control.errors?null:e.controlDir.control.errors.required),t.xp6(1),t.Q6J("ngIf",null==e.controlDir.control.errors?null:e.controlDir.control.errors.pattern)}}function m(n,a){1&n&&(t.TgZ(0,"span"),t._uU(1,"Email address is in use"),t.qZA())}function f(n,a){if(1&n&&(t.TgZ(0,"div",10),t.YNc(1,m,2,0,"span",9),t.qZA()),2&n){const e=t.oxw();t.xp6(1),t.Q6J("ngIf",null==e.controlDir.control.errors?null:e.controlDir.control.errors.emailExists)}}let i=(()=>{class n{constructor(e){this.controlDir=e,this.type="text",this.controlDir.valueAccessor=this}ngOnInit(){const e=this.controlDir.control,_=e?.asyncValidator?[e.asyncValidator]:[];e?.setValidators(e?.validator?[e.validator]:[]),e?.setAsyncValidators(_),e?.updateValueAndValidity()}onChange(e){}onTouched(){}writeValue(e){this.input.nativeElement.value=e||""}registerOnChange(e){this.onChange=e}registerOnTouched(e){this.onTouched=e}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(p.a5,2))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-text-input"]],viewQuery:function(e,o){if(1&e&&t.Gf(u,7),2&e){let _;t.iGM(_=t.CRH())&&(o.input=_.first)}},inputs:{type:"type",label:"label"},decls:8,vars:9,consts:[[1,"form-floating","mb-3"],[1,"form-control",3,"ngClass","type","id","placeholder","input","blur"],["input",""],["class","fa fa-spinner fa-spin loader",4,"ngIf"],[3,"for"],["class","invalid-feedback",4,"ngIf"],["class","invalid-feedback d-block",4,"ngIf"],[1,"fa","fa-spinner","fa-spin","loader"],[1,"invalid-feedback"],[4,"ngIf"],[1,"invalid-feedback","d-block"]],template:function(e,o){1&e&&(t.TgZ(0,"div",0)(1,"input",1,2),t.NdJ("input",function(T){return o.onChange(T.target.value)})("blur",function(){return o.onTouched()}),t.qZA(),t.YNc(3,l,1,0,"div",3),t.TgZ(4,"label",4),t._uU(5),t.qZA(),t.YNc(6,h,3,2,"div",5),t.YNc(7,f,2,1,"div",6),t.qZA()),2&e&&(t.xp6(1),t.s9C("id",o.label),t.s9C("placeholder",o.label),t.Q6J("ngClass",o.controlDir&&o.controlDir.control&&o.controlDir.control.touched?o.controlDir.control.valid?"is-valid":"is-invalid":null)("type",o.type),t.xp6(2),t.Q6J("ngIf",o.controlDir&&o.controlDir.control&&"PENDING"===o.controlDir.control.status),t.xp6(1),t.s9C("for",o.label),t.xp6(1),t.Oqu(o.label),t.xp6(1),t.Q6J("ngIf",o.controlDir&&o.controlDir.control&&!o.controlDir.control.valid&&o.controlDir.control.touched),t.xp6(1),t.Q6J("ngIf",o.controlDir&&o.controlDir.control&&!o.controlDir.control.valid&&o.controlDir.control.dirty))},dependencies:[c.mk,c.O5],styles:[".loader[_ngcontent-%COMP%]{position:absolute;width:auto;top:20px;right:10px;margin-top:0}"]}),n})()},6487:(v,g,r)=>{r.d(g,{E:()=>t});class t{constructor(){this.brandId=0,this.typeId=0,this.sort="name",this.pageNumber=1,this.pageSize=6}}},5053:(v,g,r)=>{r.d(g,{S:()=>c});var t=r(1571),p=r(6895);let c=(()=>{class u{constructor(){}ngOnInit(){}}return u.\u0275fac=function(d){return new(d||u)},u.\u0275cmp=t.Xpm({type:u,selectors:[["app-order-totals"]],inputs:{shippingPrice:"shippingPrice",subtotal:"subtotal",total:"total"},decls:25,vars:9,consts:[[1,"bg-light","px-4","text-uppercase","font-weight-bold",2,"padding","1.20em"],[1,"p-4"],[1,"font-italic","mb-4"],[1,"list-unstyled","mb-4"],[1,"d-flex","justify-content-between","py-3","border-bottom"],[1,"text-muted"]],template:function(d,s){1&d&&(t.TgZ(0,"div",0)(1,"strong"),t._uU(2,"Order Summary"),t.qZA()(),t.TgZ(3,"div",1)(4,"p",2),t._uU(5,"Shipping costs will be added depending on choices made during checkout"),t.qZA(),t.TgZ(6,"ul",3)(7,"li",4)(8,"strong",5),t._uU(9,"Order subtotal"),t.qZA(),t.TgZ(10,"strong"),t._uU(11),t.ALo(12,"currency"),t.qZA()(),t.TgZ(13,"li",4)(14,"strong",5),t._uU(15,"Shipping and handling"),t.qZA(),t.TgZ(16,"strong"),t._uU(17),t.ALo(18,"currency"),t.qZA()(),t.TgZ(19,"li",4)(20,"strong",5),t._uU(21,"Total Cost"),t.qZA(),t.TgZ(22,"strong"),t._uU(23),t.ALo(24,"currency"),t.qZA()()()()),2&d&&(t.xp6(11),t.Oqu(t.lcZ(12,3,s.subtotal)),t.xp6(6),t.Oqu(t.lcZ(18,5,s.shippingPrice)),t.xp6(6),t.Oqu(t.lcZ(24,7,s.total)))},dependencies:[p.H9]}),u})()},3412:(v,g,r)=>{r.d(g,{d:()=>h});var t=r(529),p=r(9646),c=r(4004),u=r(2340);class l{constructor(){this.data=[]}}var d=r(6487),s=r(1571);let h=(()=>{class m{constructor(i){this.http=i,this.baseUrl=u.N.apiUrl,this.products=[],this.brands=[],this.types=[],this.photos=[],this.pagination=new l,this.shopParams=new d.E,this.productCache=new Map}getProducts(i){if(!1===i&&(this.productCache=new Map),this.productCache.size>0&&!0===i&&this.productCache.has(Object.values(this.shopParams).join("-")))return this.pagination.data=this.productCache.get(Object.values(this.shopParams).join("-")),(0,p.of)(this.pagination);let n=new t.LE;return 0!==this.shopParams.brandId&&(n=n.append("brandId",this.shopParams.brandId.toString())),0!==this.shopParams.typeId&&(n=n.append("typeId",this.shopParams.typeId.toString())),this.shopParams.search&&(n=n.append("search",this.shopParams.search)),n=n.append("sort",this.shopParams.sort),n=n.append("pageIndex",this.shopParams.pageNumber.toString()),n=n.append("pageSize",this.shopParams.pageSize.toString()),this.http.get(this.baseUrl+"products",{observe:"response",params:n}).pipe((0,c.U)(a=>(this.productCache.set(Object.values(this.shopParams).join("-"),a.body.data),this.pagination=a.body,this.pagination)))}setShopParams(i){this.shopParams=i}getShopParams(){return this.shopParams}getProduct(i){let n;return this.productCache.forEach(a=>{n=a.find(e=>e.id===i)}),n?(0,p.of)(n):this.http.get(this.baseUrl+"products/"+i)}getPhotosForProduct(i){return this.http.get(this.baseUrl+"photos/"+i)}getBrands(){return this.brands.length>0?(0,p.of)(this.brands):this.http.get(this.baseUrl+"products/brands").pipe((0,c.U)(i=>(this.brands=i,i)))}getTypes(){return this.types.length>0?(0,p.of)(this.types):this.http.get(this.baseUrl+"products/types").pipe((0,c.U)(i=>(this.types=i,i)))}addProduct(i){return this.http.post(this.baseUrl+"Products/add-product",i).pipe((0,c.U)(n=>n))}deleteProduct(i){return console.log(i),this.http.delete(this.baseUrl+"products/"+i)}}return m.\u0275fac=function(i){return new(i||m)(s.LFG(t.eN))},m.\u0275prov=s.Yz7({token:m,factory:m.\u0275fac,providedIn:"root"}),m})()}}]);
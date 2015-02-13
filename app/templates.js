define(['handlebars'], function(Handlebars) {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['category.hbs'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<li id=\"category-";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"categories\">\n	<a href=\"#category/";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</a>\n</li>\n";
  return buffer;
  });
templates['detail.hbs'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"modal fade\" id=\"detailsModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLabel\" aria-hidden=\"true\">\n	<div class=\"modal-dialog\">\n		<div class=\"modal-content\">\n\n			<div class=\"modal-header\">\n				<button type=\"button\" class=\"close js-close\">&times;</button>\n				<h2 class=\"modal-title\">";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h2>\n			</div>\n\n			<div class=\"modal-body\">\n				<img\n						src=\"http://www.bestbuy.ca/";
  if (stack1 = helpers.thumbnailImage) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.thumbnailImage; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" \n						alt=\"";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n				<div class=\"description\">";
  if (stack1 = helpers.shortDescription) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.shortDescription; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</div>\n				<!-- <div class=\"price\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.product),stack1 == null || stack1 === false ? stack1 : stack1.salePrice)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div> -->\n				<h2 class=\"modal-title price\"> <span class=\"label label-default\">$";
  if (stack2 = helpers.salePrice) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.salePrice; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "</span></h2>\n			</div>\n\n			<div class=\"modal-footer\">\n				<button type=\"button\" class=\"btn btn-default js-close\">Close</button>\n			</div>\n\n		</div>\n	</div>\n</div>\n";
  return buffer;
  });
templates['listing.hbs'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"col-sm-6 col-md-4\">\n	<div class=\"thumbnail\">\n		<img src=\"http://www.bestbuy.ca/";
  if (stack1 = helpers.thumbnailImage) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.thumbnailImage; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" alt=\"";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n		<div class=\"productName\">";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</div>\n		<div class=\"productActions\"><a href=\"#\" data-id=\"";
  if (stack1 = helpers.sku) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.sku; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"btn btn-primary js-show\" role=\"button\">Show..</a></div>\n	</div>\n</div>\n";
  return buffer;
  });
});
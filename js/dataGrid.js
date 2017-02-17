!function(){"use strict";function t(t,e){var i=[];return t?(t.forEach(function(t){~i.indexOf(t[e])||i.push(t[e])}),i.map(function(t){return{text:t,value:t}})):void 0}angular.module("dataGrid",[]).filter("startFrom",function(){return function(t,e){return t?(e=+e,t.slice(e)):[]}}).controller("gridController",["$scope","$element","$filter","$location","filtersFactory",function(e,i,r,n,a){function o(t){var i,r=!1;i="page="+e.paginationOptions.currentPage,e.paginationOptions.itemsPerPage!==e.defaultsPaginationOptions.itemsPerPage&&(i+="&itemsPerPage="+e.paginationOptions.itemsPerPage),e.sortOptions.predicate&&(i+="&sort="+encodeURIComponent(e.sortOptions.predicate+"-"+e.sortOptions.direction)),e.filters.forEach(function(t){var n=t.model,a=t.isInScope?e.$eval(n):e.$parent.$eval(n);if(t.disableUrl)return void(r=!0);if(a){var o;if(a instanceof Date){if(isNaN(a.getTime()))return;o=a.getFullYear()+"-",o+=a.getMonth()<9?"0"+(a.getMonth()+1)+"-":a.getMonth()+1+"-",o+=a.getDate()<10?"0"+a.getDate():a.getDate(),a=o}i+="&"+encodeURIComponent(n)+"="+encodeURIComponent(a)}}),r&&c(),n.path(i),t&&e.$apply()}function s(){var t=n.path().slice(1),i={},r={};if(e.params=i,t.split("&").forEach(function(t){var e=t.split("=");i[e[0]]=e[1],"page"!==e[0]&&"sort"!==e[0]&&"itemsPerPage"!==e[0]&&(r[decodeURIComponent(e[0])]=decodeURIComponent(e[1]))}),e.filters.forEach(function(t){var i=t.model,n=r[i];if(!t.disableUrl){if(~t.filterType.toLowerCase().indexOf("date"))return e.$parent.__evaltmp=n?new Date(n):null,void e.$parent.$eval(i+"=__evaltmp");"select"!==t.filterType||n||(n=""),n&&(t.isInScope?(e.__evaltmp=n,e.$eval(i+"=__evaltmp")):(e.$parent.__evaltmp=n,e.$parent.$eval(i+"=__evaltmp")))}}),e.paginationOptions.itemsPerPage=e.defaultsPaginationOptions.itemsPerPage,e.paginationOptions.currentPage=e.defaultsPaginationOptions.currentPage,i.itemsPerPage&&(e.paginationOptions.itemsPerPage=i.itemsPerPage),i.page&&(!e.serverPagination&&(i.page-1)*e.paginationOptions.itemsPerPage>e.filtered.length?e.paginationOptions.currentPage=1:e.paginationOptions.currentPage=i.page),i.sort){var a=i.sort.split("-");e.sortOptions.predicate=decodeURIComponent(a[0]),e.sortOptions.direction=decodeURIComponent(a[1])}e.serverPagination||c()}function l(){var t=n.path().slice(1);!t&&e.sortOptions.predicate?e.sort(e.sortOptions.predicate,!0):e._gridOptions.getData("?"+t,function(t,i){e.filtered=t,e.paginationOptions.totalItems=i})}function c(){var t=Date.now(),i=!1;e._time={},e.sortOptions.predicate&&e.sortCache&&e.sortCache.predicate===e.sortOptions.predicate&&e.sortCache.direction===e.sortOptions.direction?(e.filtered=e.sortCache.data.slice(),i=!0):e.filtered=e._gridOptions.data.slice(),e._time.copy=Date.now()-t;var n=Date.now();p(),e._time.filters=Date.now()-n;var a=Date.now();e.sortOptions.predicate&&!i&&(e.filtered=r("orderBy")(e.filtered,e.sortOptions.predicate,"desc"===e.sortOptions.direction),e.sortCache={data:e.filtered.slice(),predicate:e.sortOptions.predicate,direction:e.sortOptions.direction}),e._time.sort=Date.now()-a,e._time.all=Date.now()-t,e.paginationOptions.totalItems=e.filtered.length}function p(){e.filters.forEach(function(t){var i=t.filterBy,r=t.model,n=t.isInScope?e.$eval(r):e.$parent.$eval(r),o=t.filterType;if(e.customFilters[r])e.filtered=e.customFilters[r](e.filtered,n,i);else if(n&&o){var s=a.getFilterByType(o);s&&(e.filtered=s(e.filtered,n,i))}})}e._gridOptions=e.$eval(i.attr("grid-options")),e._gridActions=e.$eval(i.attr("grid-actions")),e.serverPagination="true"===i.attr("server-pagination"),e.getDataDelay=i.attr("get-delay")||350,e._gridActions||(e.$parent.$eval(i.attr("grid-actions")+"= {}"),e._gridActions=e.$parent.$eval(i.attr("grid-actions"))),e._gridOptions.grid=e,e.filtered=e._gridOptions.data.slice(),e.paginationOptions=e._gridOptions.pagination?angular.copy(e._gridOptions.pagination):{},e.defaultsPaginationOptions={itemsPerPage:e.paginationOptions.itemsPerPage||"10",currentPage:e.paginationOptions.currentPage||1},e.paginationOptions=angular.copy(e.defaultsPaginationOptions),e.sortOptions=e._gridOptions.sort?angular.copy(e._gridOptions.sort):{},e.customFilters=e._gridOptions.customFilters?angular.copy(e._gridOptions.customFilters):{},e.urlSync=e._gridOptions.urlSync,e.$watch("_gridOptions.data",function(i){i&&i.length&&(e.sortCache={},e.filtered=e._gridOptions.data.slice(),e.filters.forEach(function(i){"select"===i.filterType&&(e[i.model+"Options"]=t(e.filtered,i.filterBy))}),e.urlSync?s(n.path()):c())}),e.sort=function(t,i){if(!i){var r=e.sortOptions.predicate===t&&"desc"===e.sortOptions.direction?"asc":"desc";e.sortOptions.direction=r,e.sortOptions.predicate=t}e.paginationOptions.currentPage=1,e.reloadGrid(i)},e.filter=function(){e.paginationOptions.currentPage=1,e.reloadGrid()},e.$on("$locationChangeSuccess",function(){(e.urlSync||e.serverPagination)&&(e.serverPagination&&(clearTimeout(e.getDataTimeout),e.getDataTimeout=setTimeout(l,e.getDataDelay)),e.filtered&&s(n.path()))}),e.reloadGrid=function(t){e.urlSync||e.serverPagination?o(t):c()},e._gridActions.refresh=e.reloadGrid,e._gridActions.filter=e.filter,e._gridActions.sort=e.sort}]).directive("gridData",["$compile","$animate",function(e){return{restrict:"EA",scope:!0,controller:"gridController",link:function(i,r,n){var a=[],o=[],s=[],l=r.parent(),c=n.id,p="true"===n.serverPagination;angular.forEach(angular.element(l[0].querySelectorAll("[sortable]")),function(t){var r=angular.element(t),n=r.attr("sortable");a.push(r),r.attr("ng-class","{'sort-ascent' : sortOptions.predicate ==='"+n+"' && sortOptions.direction === 'asc', 'sort-descent' : sortOptions.predicate === '"+n+"' && sortOptions.direction === 'desc'}"),r.attr("ng-click","sort('"+n+"')"),e(r)(i)}),angular.forEach(angular.element(document.querySelectorAll("[filter-by]")),function(e){var n=angular.element(e),a=r.find(n).length>0,s=n.attr("filter-by"),l=n.attr("filter-type")||"",p=n.attr("ng-model"),d=n.attr("disable-url");c&&n.attr("grid-id")&&c!=n.attr("grid-id")||("select"!==l||(i[p+"Options"]=t(i.$eval(r.attr("grid-options")+".data"),s)),!~l.indexOf("date")||n.attr("ng-focus")||n.attr("ng-blur")||(n.attr("ng-focus","filter('{"+p+" : this."+p+"}')"),n.attr("ng-blur","filter('{"+p+" : this."+p+"}')")),p||(p=s,n.attr("ng-model",s),n.attr("ng-change","filter()")),o.push({model:p,isInScope:a,filterBy:s,filterType:l,disableUrl:d}))}),angular.forEach(angular.element(l[0].querySelectorAll("[grid-item]")),function(t){var r=angular.element(t);s.push(r),p?r.attr("ng-repeat","item in filtered"):r.attr("ng-repeat","item in filtered | startFrom:(paginationOptions.currentPage-1)*paginationOptions.itemsPerPage | limitTo:paginationOptions.itemsPerPage track by $index"),e(r)(i)}),i.sorting=a,i.rows=s,i.filters=o}}}]).factory("filtersFactory",function(){function t(t,e,i){return t.filter(function(t){return e&&t[i]?t[i]===e:!0})}function e(t,e,i){return t.filter(function(t){return e&&t[i]?~(t[i]+"").toLowerCase().indexOf((e+"").toLowerCase()):!!t[i]})}function i(t,e,i){return e=new Date(e).getTime(),t.filter(function(t){return e&&t[i]?t[i]<=e+86399999:!0})}function r(t,e,i){return e=new Date(e).getTime(),t.filter(function(t){return e&&t[i]?t[i]>=e:!0})}return{getFilterByType:function(n){switch(n){case"select":return t;case"text":return e;case"dateTo":return i;case"dateFrom":return r;default:return null}}}})}();
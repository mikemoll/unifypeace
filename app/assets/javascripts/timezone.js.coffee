timezone = jstz.determine()
$.ajax
  url: "/set_timezone"
  data: "timezone=" + timezone.name()
console.log timezone.name()
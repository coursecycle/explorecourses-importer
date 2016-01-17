require "nokogiri"
require "openssl"
require "uri"
require "net/http"

doc = File.open("data/cs107.xml") { |f| Nokogiri::XML(f) }

def persist_course(course)
  url = URI("https://localhost:3000/courses/import")

  http = Net::HTTP.new(url.host, url.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_NONE

  request = Net::HTTP::Post.new(url)
  request["content-type"] = 'application/xml'
  request["cache-control"] = 'no-cache'
  request.body = course.to_s

  response = http.request(request)

  print "."
  $stdout.flush
end

courses = doc.xpath("//course")
courses.each do |course|
  persist_course course
end

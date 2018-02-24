require "json"

package = JSON.parse(File.read(File.join(__dir__, "../package.json")))
version = package["version"]

Pod::Spec.new do |s|
  s.name         = "RNADBMobile"
  s.version      = version
  s.summary      = package["description"]
  s.homepage     = "https://github.com/workco/react-native-adbmobile"
  s.description  = "iOS bindings for React Native Adobe Mobile Services"
  s.license      = package["license"]
  s.author       = { "Gustavo Sverzut Barbieri" => "barbieri@work.co" }
  s.platform     = :ios, "8.0"
  s.source       = { :git => "https://github.com/workco/react-native-adbmobile.git", :tag => "master" }
  s.source_files = "*.{swift,h,m}"
  s.requires_arc = true

  s.dependency     "React"
end

# explorecourses-importer

Bulk imports a snapshot of the [ExploreCourses][0] database into [Coursecycle][1].

## Requirements

* Ruby
* Nokogiri (`gem install nokogiri`)
* Running installation of [coursecycle-server][2]

## Instructions

1. Modify the top lines of `parser.rb` to point to the correct file and Coursecycle server.
2. Run `ruby parser.rb`
3. ????
4. Profit

[0]: https://explorecourses.stanford.edu
[1]: https://coursecycle.com
[2]: https://github.com/coursecycle/coursecycle-server

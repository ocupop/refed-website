module Jekyll
  module Filters
    def add_commas(number)
      number.to_s.chars.to_a.reverse.each_slice(3).map(&:join).join(",").reverse
    end
  end
end

Liquid::Template.register_filter(Jekyll::Filters)
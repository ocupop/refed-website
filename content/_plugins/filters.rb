require 'active_support/inflector'
module Jekyll
  module Filters
    def add_commas(number)
      whole, decimal = number.to_s.split(".")
      whole_with_commas = whole.chars.to_a.reverse.each_slice(3).map(&:join).join(",").reverse
      [whole_with_commas, decimal].compact.join(".")
    end

    def singularize(str)
      ActiveSupport::Inflector.singularize(str)
    end
  end
end

Liquid::Template.register_filter(Jekyll::Filters)
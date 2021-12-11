(ns app.day1)
(require '[clojure.string :as str])

(defn part1
  [file]
  (as-> (slurp file) s
           (str/split s #"\n")
           (map #(Integer/parseInt %) s)
           (partition 2 1 s)
           (filter #(apply < %) s)
           (count s)
  ))
(print "\nPart1:\n" (part1 (clojure.java.io/resource "input1_1.txt")))

(defn part2
  [file]
  (as-> (slurp file) s
           (str/split s #"\n")
           (map #(Integer/parseInt %) s)
           (partition 3 1 s)
           (map #(apply + %) s)
           (partition 2 1 s)
           (filter #(apply < %) s)
           (count s)
  ))
(print "\nPart 2:\n" (part2 (clojure.java.io/resource "input1_1.txt")))

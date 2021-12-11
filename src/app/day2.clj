(ns app.day2)
(require '[clojure.string :as str])
(require '[clojure.core.match :refer [match]])

(defn part1
  [file]
  (as-> (slurp file) s
    (str/split s #"\n")
    (doseq  [n s]
      (let [[dir val] (str/split n #" " 2)]
        '(dir val)
        )

      )))



(print "\n\nPart1:\n" (part1 (clojure.java.io/resource "input2_demo.txt")))
        #_(match [dir val]
         ["forward" _] 1
         ["down" _] 2
         ["up" _] 3)

#_(defn part2
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
#_(print "\nPart 2:\n" (part2 (clojure.java.io/resource "input1_1.txt")))

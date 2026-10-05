/**
 * Сопоставление серии инструмента с листом режимов резания.
 *
 * Лист режимов не обязан называться как серия: «2ss» — усреднённые режимы для
 * всего семейства спиральных сверл 2ss003…2ss278, «6rp» — для всех резьбовых
 * фрез 6rp02…6rp13. Поэтому лист подходит и по точному имени, и по префиксу
 * имени серии, а из нескольких префиксов побеждает самый длинный.
 *
 * Модуль используется только на этапе сборки (`gridsome.server.js`), поэтому
 * CommonJS — как у конфигов Gridsome.
 */

/** Префикс засчитывается, только если он закончился границей имени: цифрой, дефисом или точкой. */
const NAME_BOUNDARY = /[\d\-_.]/

/**
 * Лист режимов серии `id` или `null`, если режимов для серии нет.
 * @param {String} id идентификатор серии, например `2ss003-ss`
 * @param {String[]} modesSeries имена листов режимов резания
 * @returns {String|null}
 */
function resolveModesSeries(id, modesSeries) {
    const series = modesSeries || []

    if (series.includes(id)) {
        return id
    }

    let longest = null
    for (const candidate of series) {
        if (!id.startsWith(candidate) || !NAME_BOUNDARY.test(id.charAt(candidate.length))) {
            continue
        }
        if (!longest || candidate.length > longest.length) {
            longest = candidate
        }
    }

    return longest
}

module.exports = { resolveModesSeries }

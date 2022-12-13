define([
    '../store',
    '../locale/locale',
    '../methods/get',
    '../methods/set',
    '../utils/util'
], function (Store, locale, m_get, m_set, m_util) {
    'use strict';
    const {getSheetIndex} = m_get;
    const {setluckysheet_scroll_status} = m_set;
    const {replaceHtml, transformRangeToAbsolute, openSelfModel} = m_util;
    let isInitialProtection = false, isInitialProtectionAddRang = false, rangeItemListCache = [], isAddRangeItemState = true, updateRangeItemIndex = null, validationAuthority = null, updatingSheetFile = null, firstInputSheetProtectionPassword = true;
    let sqrefMapCache = {}, inputRangeProtectionPassword = {}, initialRangePasswordHtml = false;
    //protection state
    function checkProtectionNotEnable(sheetIndex) {
        let sheetFile = Store.getSheetByIndex(sheetIndex);
        if (sheetFile == null) {
            return true;
        }
        if (sheetFile.config == null || sheetFile.config.authority == null) {
            return true;
        }
        let aut = sheetFile.config.authority;
        if (aut == null || aut.sheet == null || aut.sheet == 0) {
            return true;
        }
        const _locale = locale();
        const local_protection = _locale.protection;
        let ht;
        if (aut.hintText != null && aut.hintText.length > 0) {
            ht = aut.hintText;
        } else {
            ht = local_protection.defaultSheetHintText;
        }
        tooltip.info('', ht);
        return false;
    }
    function checkProtectionLocked(r, c, sheetIndex) {
        let sheetFile = Store.getSheetByIndex(sheetIndex);
        if (sheetFile == null) {
            return true;
        }
        if (sheetFile.config == null || sheetFile.config.authority == null) {
            return true;
        }
        let data = sheetFile.data, cell = data[r][c], aut = sheetFile.config.authority;
        if (aut == null || aut.sheet == null || aut.sheet == 0) {
            return true;
        }
        if (cell && !cell.lo) {
            return true;
        }
        const _locale = locale();
        const local_protection = _locale.protection;
        return checkProtectionLockedSqref(r, c, aut, local_protection);
    }
    function checkProtectionCellHidden(r, c, sheetIndex) {
        let sheetFile = Store.getSheetByIndex(sheetIndex);
        if (!sheetFile || !sheetFile.data[r] || !sheetFile.data[r][c]) {
            return true;
        }
        if (sheetFile.config == null || sheetFile.config.authority == null) {
            return true;
        }
        let data = sheetFile.data, cell = data[r][c], aut = sheetFile.config.authority;
        if (aut == null || aut.sheet == null || aut.sheet == 0) {
            return true;
        }
        if (cell == null || cell.hi == null || cell.hi == 0) {
            return true;
        }
        return false;
    }
    function checkProtectionLockedRangeList(rangeList, sheetIndex) {
        //EPM-BUDGET-START
        if (rangeList[0].column[0] !== rangeList[0].column[1])
            return true;    //EPM-BUDGET-END
        //EPM-BUDGET-END
        let sheetFile = Store.getSheetByIndex(sheetIndex);
        if (sheetFile == null) {
            return true;
        }
        if (sheetFile.config == null || sheetFile.config.authority == null) {
            return true;
        }
        let aut = sheetFile.config.authority;
        if (aut == null || aut.sheet == null || aut.sheet == 0) {
            return true;
        }
        if (rangeList == null || rangeList.length == 0) {
            return true;
        }    //EPM-BUDGET-START
        //EPM-BUDGET-START
        let cell = sheetFile.data[rangeList[0].row[0]][rangeList[0].column[0]];
        if (cell && !cell.lo) {
            return true;
        }    //EPM-BUDGET-END
        //EPM-BUDGET-END
        const _locale = locale();
        const local_protection = _locale.protection;
        for (let s = 0; s < rangeList.length; s++) {
            let r1 = rangeList[s].row[0], r2 = rangeList[s].row[1];
            let c1 = rangeList[s].column[0], c2 = rangeList[s].column[1];
            for (let r = r1; r <= r2; r++) {
                for (let c = c1; c <= c2; c++) {
                    let isPass = checkProtectionLockedSqref(r, c, aut, local_protection);
                    if (isPass == false) {
                        return false;
                    }
                }
            }
        }
        return true;
    }
    function checkProtectionSelectLockedOrUnLockedCells(r, c, sheetIndex) {
        const _locale = locale();
        const local_protection = _locale.protection;
        let sheetFile = Store.getSheetByIndex(sheetIndex);
        if (sheetFile == null) {
            return true;
        }
        if (sheetFile.config == null || sheetFile.config.authority == null) {
            return true;
        }
        let data = sheetFile.data, cell = data[r][c], aut = sheetFile.config.authority;
        if (aut == null || aut.sheet == null || aut.sheet == 0) {
            return true;
        }
        if (cell && !cell.lo) {
            //unlocked
            if (aut.selectunLockedCells == 1 || aut.selectunLockedCells == null) {
                return true;
            } else {
                return false;
            }
        } else {
            //locked??
            let isAllEdit = checkProtectionLockedSqref(r, c, aut, local_protection, false);    //dont alert password model
            //dont alert password model
            if (isAllEdit) {
                //unlocked
                if (aut.selectunLockedCells == 1 || aut.selectunLockedCells == null) {
                    return true;
                } else {
                    return false;
                }
            } else {
                //locked
                if (aut.selectLockedCells == 1 || aut.selectLockedCells == null) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    }
    function checkProtectionAllSelected(sheetIndex) {
        const _locale = locale();
        const local_protection = _locale.protection;
        let sheetFile = Store.getSheetByIndex(sheetIndex);
        if (sheetFile == null) {
            return true;
        }
        if (sheetFile.config == null || sheetFile.config.authority == null) {
            return true;
        }
        let aut = sheetFile.config.authority;
        if (aut == null || aut.sheet == null || aut.sheet == 0) {
            return true;
        }
        let selectunLockedCells = false;
        if (aut.selectunLockedCells == 1 || aut.selectunLockedCells == null) {
            selectunLockedCells = true;
        }
        let selectLockedCells = false;
        if (aut.selectLockedCells == 1 || aut.selectLockedCells == null) {
            selectLockedCells = true;
        }
        if (selectunLockedCells && selectLockedCells) {
            return true;
        }
        return false;
    }
    function checkProtectionFormatCells(sheetIndex) {
        let sheetFile = Store.getSheetByIndex(sheetIndex);
        if (sheetFile == null) {
            return true;
        }
        if (sheetFile.config == null || sheetFile.config.authority == null) {
            return true;
        }
        let aut = sheetFile.config.authority;
        if (aut == null || aut.sheet == null || aut.sheet == 0) {
            return true;
        }
        if (aut.formatCells == 1 || aut.formatCells == null) {
            return true;
        }
        const _locale = locale();
        const local_protection = _locale.protection;
        let ht;
        if (aut.hintText != null && aut.hintText.length > 0) {
            ht = aut.hintText;
        } else {
            ht = local_protection.defaultSheetHintText;
        }
        tooltip.info('', ht);
        return false;
    }
    function checkProtectionAuthorityNormal(sheetIndex, type = 'formatColumns', isAlert = true) {
        let sheetFile = Store.getSheetByIndex(sheetIndex);
        if (sheetFile == null) {
            return true;
        }
        if (sheetFile.config == null || sheetFile.config.authority == null) {
            return true;
        }
        let aut = sheetFile.config.authority;
        if (aut == null || aut.sheet == null || aut.sheet == 0) {
            return true;
        }
        if (aut[type] == 1 || aut[type] == null) {
            return true;
        }
        if (isAlert) {
            const _locale = locale();
            const local_protection = _locale.protection;
            let ht;
            if (aut.hintText != null && aut.hintText.length > 0) {
                ht = aut.hintText;
            } else {
                ht = local_protection.defaultSheetHintText;
            }
            tooltip.info('', ht);
        }
        return false;
    }
    return {
        checkProtectionNotEnable: checkProtectionNotEnable,
        checkProtectionLocked: checkProtectionLocked,
        checkProtectionCellHidden: checkProtectionCellHidden,
        checkProtectionLockedRangeList: checkProtectionLockedRangeList,
        checkProtectionSelectLockedOrUnLockedCells: checkProtectionSelectLockedOrUnLockedCells,
        checkProtectionAllSelected: checkProtectionAllSelected,
        checkProtectionFormatCells: checkProtectionFormatCells,
        checkProtectionAuthorityNormal: checkProtectionAuthorityNormal
    };
});
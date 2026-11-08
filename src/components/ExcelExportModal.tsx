/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * TopQ Academy - Excel Export Modal
 * Allows downloading inquiries, enrollments, and leads in real .xlsx format
 * with date filters: Past 24 hours, 1 day ago, Past 1 week, and Custom date range.
 */

import React, { useState } from 'react';
import { X, Download, Calendar, Clock, Check, FileSpreadsheet, Filter } from 'lucide-react';
import * as XLSX from 'xlsx';

export type TimeFilter = 'past_24h' | '1_day_ago' | 'past_1w' | 'custom' | 'all';

interface ExcelExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  enrollments: any[];
  leads: any[];
  guidance: any[];
  registrations: any[];
}

export const ExcelExportModal: React.FC<ExcelExportModalProps> = ({
  isOpen,
  onClose,
  enrollments,
  leads,
  guidance,
  registrations,
}) => {
  const [filterType, setFilterType] = useState<TimeFilter>('past_24h');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen) return null;

  // Filter items according to selected time frame
  const filterByDate = (items: any[]) => {
    const now = new Date();
    const nowMs = now.getTime();

    return items.filter((item) => {
      const itemDateStr = item.created_at || item.createdAt || item.last_login;
      if (!itemDateStr) return true; // Keep if no timestamp
      const itemDate = new Date(itemDateStr);
      const itemMs = itemDate.getTime();

      if (filterType === 'all') return true;

      if (filterType === 'past_24h') {
        const past24hMs = nowMs - 24 * 60 * 60 * 1000;
        return itemMs >= past24hMs && itemMs <= nowMs;
      }

      if (filterType === '1_day_ago') {
        // Yesterday (between 24h ago and 48h ago)
        const past24hMs = nowMs - 24 * 60 * 60 * 1000;
        const past48hMs = nowMs - 48 * 60 * 60 * 1000;
        return itemMs >= past48hMs && itemMs < past24hMs;
      }

      if (filterType === 'past_1w') {
        const past1wMs = nowMs - 7 * 24 * 60 * 60 * 1000;
        return itemMs >= past1wMs && itemMs <= nowMs;
      }

      if (filterType === 'custom') {
        if (!startDate && !endDate) return true;
        const startMs = startDate ? new Date(startDate).setHours(0, 0, 0, 0) : 0;
        const endMs = endDate ? new Date(endDate).setHours(23, 59, 59, 999) : Infinity;
        return itemMs >= startMs && itemMs <= endMs;
      }

      return true;
    });
  };

  const handleExport = () => {
    setIsExporting(true);
    try {
      const filteredEnrollments = filterByDate(enrollments);
      const filteredLeads = filterByDate(leads);
      const filteredGuidance = filterByDate(guidance);
      const filteredRegistrations = filterByDate(registrations);

      const workbook = XLSX.utils.book_new();

      // Format Sheet 1: Course Enrollments
      const enrollmentsSheetData = filteredEnrollments.map((e, idx) => ({
        '#': idx + 1,
        'Student Name': e.user_name || e.name || 'N/A',
        'Email Address': e.user_email || e.email || 'N/A',
        'Mobile Phone': e.user_phone || e.phone || 'N/A',
        'Course Pathway': e.course_track || e.course || 'N/A',
        'Learning Mode': e.learning_mode || 'Online',
        'Experience Level': e.experience || 'Beginner',
        'Enrollment Status': e.status || 'Confirmed',
        'Registered Date': e.created_at ? new Date(e.created_at).toLocaleString() : 'N/A',
      }));
      const wsEnrollments = XLSX.utils.json_to_sheet(
        enrollmentsSheetData.length > 0
          ? enrollmentsSheetData
          : [{ Notice: 'No enrollments recorded for this timeframe.' }]
      );
      XLSX.utils.book_append_sheet(workbook, wsEnrollments, 'Course Enrollments');

      // Format Sheet 2: Contact Leads
      const leadsSheetData = filteredLeads.map((l, idx) => ({
        '#': idx + 1,
        'Name': l.name || 'N/A',
        'Phone': l.phone || 'N/A',
        'Interested Course': l.course || 'N/A',
        'Experience': l.experience || 'Beginner',
        'Submission Date': l.created_at ? new Date(l.created_at).toLocaleString() : 'N/A',
      }));
      const wsLeads = XLSX.utils.json_to_sheet(
        leadsSheetData.length > 0 ? leadsSheetData : [{ Notice: 'No leads found for this timeframe.' }]
      );
      XLSX.utils.book_append_sheet(workbook, wsLeads, 'Contact Inquiries');

      // Format Sheet 3: Guidance Requests
      const guidanceSheetData = filteredGuidance.map((g, idx) => ({
        '#': idx + 1,
        'Name': g.name || 'N/A',
        'Phone': g.phone || 'N/A',
        'Email': g.email || 'N/A',
        'Requested Track': g.track || 'N/A',
        'Learning Mode': g.learning_mode || 'N/A',
        'Submission Date': g.created_at ? new Date(g.created_at).toLocaleString() : 'N/A',
      }));
      const wsGuidance = XLSX.utils.json_to_sheet(
        guidanceSheetData.length > 0
          ? guidanceSheetData
          : [{ Notice: 'No guidance requests found for this timeframe.' }]
      );
      XLSX.utils.book_append_sheet(workbook, wsGuidance, 'Guidance Requests');

      // Format Sheet 4: Registered Users
      const regSheetData = filteredRegistrations.map((u, idx) => ({
        '#': idx + 1,
        'Name': u.name || 'N/A',
        'Email': u.email || 'N/A',
        'Phone': u.phone || 'N/A',
        'Role': u.role || 'student',
        'Last Active': u.last_login ? new Date(u.last_login).toLocaleString() : 'N/A',
        'Created At': u.created_at ? new Date(u.created_at).toLocaleString() : 'N/A',
      }));
      const wsReg = XLSX.utils.json_to_sheet(
        regSheetData.length > 0 ? regSheetData : [{ Notice: 'No users found for this timeframe.' }]
      );
      XLSX.utils.book_append_sheet(workbook, wsReg, 'Registered Accounts');

      // Filename
      const dateTag = new Date().toISOString().slice(0, 10);
      const filename = `TopQ_Export_${filterType}_${dateTag}.xlsx`;

      XLSX.writeFile(workbook, filename);
      onClose();
    } catch (err) {
      console.error('Export error:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const previewEnrollmentCount = filterByDate(enrollments).length;
  const previewLeadsCount = filterByDate(leads).length;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/75 backdrop-blur-md animate-fade-in"
    >
      <div className="relative w-full max-w-md glass-panel rounded-3xl p-6 sm:p-8 border shadow-2xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-left">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-5">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Export to Excel (.xlsx)</span>
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">
              Download Report
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Select the timeframe for inquiries, course enrollments, and accounts.
            </p>
          </div>

          {/* Timeframe options */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Select Time Window
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* Option 1: Past 24 Hours */}
              <button
                type="button"
                onClick={() => setFilterType('past_24h')}
                className={`flex items-center gap-2.5 p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                  filterType === 'past_24h'
                    ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold shadow-sm'
                    : 'border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                <Clock className="w-4 h-4 text-emerald-500 shrink-0" />
                <div>
                  <div className="font-bold">Past 24 Hours</div>
                  <div className="text-[10px] text-slate-500">Last 24h submissions</div>
                </div>
              </button>

              {/* Option 2: 1 Day Ago */}
              <button
                type="button"
                onClick={() => setFilterType('1_day_ago')}
                className={`flex items-center gap-2.5 p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                  filterType === '1_day_ago'
                    ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold shadow-sm'
                    : 'border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                <Calendar className="w-4 h-4 text-emerald-500 shrink-0" />
                <div>
                  <div className="font-bold">1 Day Ago</div>
                  <div className="text-[10px] text-slate-500">Yesterday only</div>
                </div>
              </button>

              {/* Option 3: Past 1 Week */}
              <button
                type="button"
                onClick={() => setFilterType('past_1w')}
                className={`flex items-center gap-2.5 p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                  filterType === 'past_1w'
                    ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold shadow-sm'
                    : 'border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                <Calendar className="w-4 h-4 text-emerald-500 shrink-0" />
                <div>
                  <div className="font-bold">Past 1 Week</div>
                  <div className="text-[10px] text-slate-500">Last 7 days</div>
                </div>
              </button>

              {/* Option 4: Custom Date Range */}
              <button
                type="button"
                onClick={() => setFilterType('custom')}
                className={`flex items-center gap-2.5 p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                  filterType === 'custom'
                    ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold shadow-sm'
                    : 'border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                <Filter className="w-4 h-4 text-emerald-500 shrink-0" />
                <div>
                  <div className="font-bold">Custom Date</div>
                  <div className="text-[10px] text-slate-500">Pick date range</div>
                </div>
              </button>
            </div>
          </div>

          {/* Custom Date Pickers */}
          {filterType === 'custom' && (
            <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Records summary preview */}
          <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/15 flex items-center justify-between text-xs">
            <span className="text-slate-600 dark:text-slate-300">Matching Records:</span>
            <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
              {previewEnrollmentCount} Enrollments · {previewLeadsCount} Leads
            </span>
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 px-4 rounded-xl font-bold border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-xs cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleExport}
              disabled={isExporting}
              className="flex-1 py-2.5 px-4 rounded-xl font-bold bg-emerald-600 text-white hover:bg-emerald-500 active:scale-98 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 text-xs cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{isExporting ? 'Generating...' : 'Download .xlsx'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


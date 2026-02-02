(function () {
  function setText(id, value) {
    var el = document.getElementById(id);
    if (el) el.textContent = value ?? "";
  }

  function esc(s) {
    return String(s ?? "").replace(/[&<>"]/g, function (c) {
      return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c];
    });
  }

  function renderSemester(sem) {
    var stats = sem.stats || {};
    var html = '';
    html += '<div class="Results"><div class="row">';
    html += '<div class="col-md-3 col-sm-6 col-xs-12"><span class="R-back2">الفصل الدراسى : </span> <span class="R-back">' + esc(sem.title) + '</span></div>';
    html += '<div class="col-md-3 col-sm-6 col-xs-12"><span class="R-back2">الساعات الفصلية : </span> <span class="R-back">' + esc(stats.creditHours ?? "") + '</span></div>';
    html += '<div class="col-md-3 col-sm-6 col-xs-12"><span class="R-back2">النقاط الفصلية : </span> <span class="R-back">' + esc(stats.points ?? "") + '</span></div>';
    html += '<div class="col-md-3 col-sm-6 col-xs-12"><span class="R-back2">المعدل الفصلى : </span> <span class="R-back">' + esc(stats.gpa ?? "") + '</span></div>';
    html += '</div></div>';

    html += '<div class="container"><div class="row"><div class="col-xs-12">';
    html += '<table class="table table-bordered table-hover table-responsive-stack">';
    html += '<thead><tr>';
    html += '<th width="3%">م</th>';
    html += '<th width="10%">كود المقرر</th>';
    html += '<th width="30%">اسم المقرر</th>';
    html += '<th width="10%">الساعات</th>';
    html += '<th width="10%">النقاط</th>';
    html += '<th width="10%">التقدير</th>';
    html += '<th width="10%">المستوى</th>';
    html += '<th width="17%">الفصل</th>';
    html += '</tr></thead><tbody>';

    var courses = sem.courses || [];
    for (var i = 0; i < courses.length; i++) {
      var c = courses[i];
      html += '<tr>';
      html += '<td data-label="م">' + esc(c.no ?? (i + 1)) + '</td>';
      html += '<td data-label="كود المقرر">' + esc(c.code) + '</td>';
      html += '<td data-label="اسم المقرر">' + esc(c.name) + '</td>';
      html += '<td data-label="الساعات">' + esc(c.hours) + '</td>';
      html += '<td data-label="النقاط">' + esc(c.points) + '</td>';
      html += '<td data-label="التقدير">' + esc(c.grade) + '</td>';
      html += '<td data-label="المستوى">' + esc(c.level) + '</td>';
      html += '<td data-label="الفصل">' + esc(c.term ?? sem.title) + '</td>';
      html += '</tr>';
    }

    html += '</tbody></table>';
    html += '</div></div></div>';

    html += '<div class="Line3">&nbsp;</div>';
    return html;
  }

  function boot() {
    var data = window.TRANSCRIPT_DATA || {};
    var s = data.student || {};

    setText("lblStdCode", s.code);
    setText("lblStdName", s.name);
    setText("lblStdName1", s.name);
    setText("lblAcademicAdv", s.academicAdvisor);
    setText("lblNationality", s.nationality);
    setText("lblStdLevel", s.level);
    setText("lblStdSection", s.section);
    setText("lblFacultyName", s.facultyName);
    setText("lblUniversityName", s.universityName || "جامعة 6 أكتوبر");
    setText("lblSectorName", s.sectorName || "قطاع المعلوماتية");

    var root = document.getElementById("semestersRoot");
    if (root) {
      var html = "";
      var semesters = data.semesters || [];
      for (var i = 0; i < semesters.length; i++) html += renderSemester(semesters[i]);
      root.innerHTML = html;
    }

    // Print behavior: hide the extra blocks then call browser print
    $("#btnPrint").on("click", function () {
      $("#mydvPrint").hide();
      window.print();
      $("#mydvPrint").show();
      return false;
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
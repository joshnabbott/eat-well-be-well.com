(function() {
  var ContactForm;

  window.ContactForm = ContactForm = (function() {

    function ContactForm(form, options) {
      var self;
      this.form = form;
      self = this;
      this.settings = $.extend({
        requiredFields: "",
        updateonsuccess: "",
        updateonfailure: ""
      }, options);
      this.form.submit(function(e) {
        e.preventDefault();
        self.errors = [];
        if (self.validateInputs()) return self.send();
      });
      $(".field_with_errors").live("blur", function(event) {
        var element;
        element = $(event.currentTarget);
        if (element.val()) return element.removeClass("field_with_errors");
      });
    }

    ContactForm.prototype.disableSubmit = function() {
      return this.form.find(':submit').attr("disabled", "disabled");
    };

    ContactForm.prototype.enableSubmit = function() {
      return this.form.find(':submit').attr("disabled", "");
    };

    ContactForm.prototype.validateInputs = function() {
      var self;
      self = this;
      this.settings.requiredFields.each(function(index, field) {
        if ($(field).val()) {
          return $(field).removeClass("field_with_errors");
        } else {
          self.errors.push(field);
          return $(field).addClass("field_with_errors");
        }
      });
      if (self.errors.length === 0) {
        return true;
      } else {
        return false;
      }
    };

    ContactForm.prototype.send = function() {
      var data, self;
      self = this;
      self.disableSubmit();
      data = this.form.serialize();
      return $.ajax(this.form.attr("action"), {
        type: 'POST',
        data: data,
        beforeSend: function(xhr) {
          return xhr.setRequestHeader("Authorization", "Basic dGVlazpjYXQ=");
        },
        error: function(xhr, textStatus, errorThrown) {
          self.enableSubmit();
          return self.settings.updateOnFailure.prepend($("#contact-form-error").html());
        },
        success: function(data, textStatus, jqXHR) {
          self.form.remove();
          self.settings.updateOnSuccess.html($("#contact-form-thank-you").html());
          return window.analytics.trackEvent('Contact Form', 'Submitted', 'Data', data);
        }
      });
    };

    return ContactForm;

  })();

}).call(this);

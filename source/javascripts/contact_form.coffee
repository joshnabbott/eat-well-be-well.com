window.ContactForm = class ContactForm
  constructor: (@form, options) ->
    self = @

    @settings = $.extend(
      requiredFields: ""
      updateonsuccess: ""
      updateonfailure: ""
    , options)

    @form.submit (e) ->
      e.preventDefault()
      self.errors = []
      self.send() if self.validateInputs()

    $(".field_with_errors").live "blur", (event) ->
      element = $(event.currentTarget)
      element.removeClass("field_with_errors") if element.val()

  disableSubmit: ->
    @form.find(':submit').attr("disabled", "disabled")

  enableSubmit: ->
    @form.find(':submit').attr("disabled", "")

  validateInputs: ->
    self = @
    @settings.requiredFields.each (index, field) ->
      if $(field).val()
        $(field).removeClass("field_with_errors")
      else
        self.errors.push field
        $(field).addClass("field_with_errors")

    if self.errors.length is 0 then true else false

  send: ->
    self = @
    self.disableSubmit()

    data = @form.serialize()

    $.ajax @form.attr("action"),
      type: 'POST'
      data: data
      beforeSend: (xhr) ->
        xhr.setRequestHeader "Authorization", "Basic NjY2OnNpcml1cw=="
      error: (xhr, textStatus, errorThrown) ->
        self.enableSubmit()
        self.settings.updateOnFailure.prepend $("#contact-form-error").html()

      success: (data, textStatus, jqXHR) ->
        self.form.remove()
        self.settings.updateOnSuccess.html $("#contact-form-thank-you").html()
        window.analytics.trackEvent 'Contact Form', 'Submitted'


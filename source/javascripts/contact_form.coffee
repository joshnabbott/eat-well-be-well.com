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
    $.ajax @form.attr("action"),
      type: 'POST'
      data: @form.serialize()
      beforeSend: (xhr) ->
        xhr.setRequestHeader "Authorization", "Basic dGVlazpjYXQ="
      error: (xhr, textStatus, errorThrown) ->
        self.settings.updateOnFailure.prepend $("#contact-form-error").html()

      success: (data, textStatus, jqXHR) ->
        self.form.remove()
        self.settings.updateOnSuccess.html $("#contact-form-thank-you").html()

